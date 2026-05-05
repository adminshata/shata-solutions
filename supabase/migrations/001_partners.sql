-- Shata Solutions · Partner program schema
-- Run in Supabase SQL editor after enabling pgcrypto + uuid-ossp

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- =========================================================
-- partner_applications  (public submissions awaiting review)
-- =========================================================
create table if not exists partner_applications (
  id              uuid primary key default uuid_generate_v4(),
  full_name       text not null,
  email           text not null,
  website         text,
  audience_size   text not null,
  channels        text[] not null default '{}',
  pitch           text not null,
  session_id      text,
  status          text not null default 'pending'
                    check (status in ('pending','approved','rejected','more_info')),
  review_notes    text,
  reviewed_by     text,
  reviewed_at     timestamptz,
  ip_address      inet,
  user_agent      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_partner_applications_status
  on partner_applications (status, created_at desc);
create index if not exists idx_partner_applications_email
  on partner_applications (email);

-- =========================================================
-- partners  (approved accounts)
-- =========================================================
create table if not exists partners (
  id                  uuid primary key default uuid_generate_v4(),
  application_id      uuid references partner_applications(id) on delete set null,
  email               text not null unique,
  full_name           text not null,
  slug                text not null unique,  -- used in /?ref=<slug>
  tier                text not null default 'starter'
                        check (tier in ('starter','pro','elite','diamond')),
  commission_rate     numeric(4,3) not null default 0.20,   -- 0.20 .. 0.35
  stripe_connect_id   text,                                 -- acct_xxx
  paypal_email        text,
  payout_method       text default 'stripe'
                        check (payout_method in ('stripe','paypal','wire')),
  tax_form_status     text not null default 'pending'
                        check (tax_form_status in ('pending','received','expired')),
  active              boolean not null default true,
  custom_coupon       text unique,                          -- e.g. MAYA20
  total_earned_cents  bigint not null default 0,
  total_paid_cents    bigint not null default 0,
  lifetime_referrals  int not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists idx_partners_slug on partners (slug);
create index if not exists idx_partners_tier on partners (tier);

-- =========================================================
-- referral_clicks  (raw click attribution log)
-- =========================================================
create table if not exists referral_clicks (
  id              uuid primary key default uuid_generate_v4(),
  partner_id      uuid not null references partners(id) on delete cascade,
  session_id      text,
  ip_address      inet,
  user_agent      text,
  landing_path    text,
  country         text,
  created_at      timestamptz not null default now()
);

create index if not exists idx_clicks_partner_time
  on referral_clicks (partner_id, created_at desc);

-- =========================================================
-- referrals  (attributed signups — one row per customer)
-- =========================================================
create table if not exists referrals (
  id                  uuid primary key default uuid_generate_v4(),
  partner_id          uuid not null references partners(id) on delete restrict,
  customer_email      text not null,
  customer_user_id    text,                 -- Supabase auth user id when available
  stripe_customer_id  text,
  plan                text,                 -- e.g. 'growth'
  mrr_cents           int not null default 0,
  status              text not null default 'trialing'
                        check (status in ('trialing','active','cancelled','refunded')),
  first_paid_at       timestamptz,
  cancelled_at        timestamptz,
  session_id          text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (customer_email)                   -- one customer can only be attributed once
);

create index if not exists idx_referrals_partner
  on referrals (partner_id, created_at desc);
create index if not exists idx_referrals_status on referrals (status);

-- =========================================================
-- commissions  (monthly accruals per referral)
-- =========================================================
create table if not exists commissions (
  id              uuid primary key default uuid_generate_v4(),
  partner_id      uuid not null references partners(id) on delete restrict,
  referral_id     uuid not null references referrals(id) on delete restrict,
  period          text not null,                    -- YYYY-MM
  amount_cents    int not null,
  rate            numeric(4,3) not null,
  status          text not null default 'pending'
                    check (status in ('pending','approved','paid','reversed')),
  payout_id       uuid,
  created_at      timestamptz not null default now(),
  unique (referral_id, period)
);

create index if not exists idx_commissions_partner_period
  on commissions (partner_id, period desc);
create index if not exists idx_commissions_status on commissions (status);

-- =========================================================
-- payouts  (batch payouts via Stripe Connect / PayPal / wire)
-- =========================================================
create table if not exists payouts (
  id                  uuid primary key default uuid_generate_v4(),
  partner_id          uuid not null references partners(id) on delete restrict,
  amount_cents        int not null,
  method              text not null check (method in ('stripe','paypal','wire')),
  external_id         text,                  -- Stripe transfer id / PayPal batch id
  status              text not null default 'pending'
                        check (status in ('pending','processing','paid','failed')),
  period_start        date,
  period_end          date,
  failure_reason      text,
  created_at          timestamptz not null default now(),
  paid_at             timestamptz
);

create index if not exists idx_payouts_partner on payouts (partner_id, created_at desc);

-- =========================================================
-- triggers: keep updated_at fresh
-- =========================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare t text;
begin
  for t in
    select unnest(array['partner_applications','partners','referrals'])
  loop
    execute format(
      'drop trigger if exists trg_%I_set_updated_at on %I;
       create trigger trg_%I_set_updated_at before update on %I
       for each row execute function set_updated_at();',
      t, t, t, t
    );
  end loop;
end $$;

-- =========================================================
-- RLS (Row Level Security)
-- =========================================================
alter table partner_applications enable row level security;
alter table partners              enable row level security;
alter table referral_clicks       enable row level security;
alter table referrals             enable row level security;
alter table commissions           enable row level security;
alter table payouts               enable row level security;

-- applications: inserts from anon (the apply form), reads restricted to service role
drop policy if exists "apps_insert_anon" on partner_applications;
create policy "apps_insert_anon"
  on partner_applications for insert
  to anon, authenticated
  with check (true);

-- partners can read/update their own row
drop policy if exists "partners_self_read" on partners;
create policy "partners_self_read"
  on partners for select
  to authenticated
  using (auth.jwt()->>'email' = email);

-- referrals/commissions/payouts: partners read their own rows only
drop policy if exists "referrals_self_read" on referrals;
create policy "referrals_self_read"
  on referrals for select
  to authenticated
  using (
    partner_id in (select id from partners where email = auth.jwt()->>'email')
  );

drop policy if exists "commissions_self_read" on commissions;
create policy "commissions_self_read"
  on commissions for select
  to authenticated
  using (
    partner_id in (select id from partners where email = auth.jwt()->>'email')
  );

drop policy if exists "payouts_self_read" on payouts;
create policy "payouts_self_read"
  on payouts for select
  to authenticated
  using (
    partner_id in (select id from partners where email = auth.jwt()->>'email')
  );

-- =========================================================
-- helper view: partner dashboard snapshot
-- =========================================================
create or replace view partner_dashboard_v as
select
  p.id,
  p.email,
  p.full_name,
  p.tier,
  p.commission_rate,
  p.slug,
  coalesce(sum(c.amount_cents) filter (where c.status in ('pending','approved')), 0) as pending_cents,
  coalesce(sum(c.amount_cents) filter (where c.status = 'paid'), 0)                  as paid_cents,
  count(distinct r.id) filter (where r.status = 'active')                            as active_referrals,
  count(distinct r.id)                                                                as total_referrals,
  coalesce(sum(r.mrr_cents) filter (where r.status = 'active'), 0)                   as total_mrr_cents
from partners p
left join referrals r   on r.partner_id = p.id
left join commissions c on c.partner_id = p.id
group by p.id;
