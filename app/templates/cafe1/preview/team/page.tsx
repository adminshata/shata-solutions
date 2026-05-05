"use client";

import Image from "next/image";
import { useSite } from "@/lib/shata-cafe/context";
import { Container, PageBanner, SectionHeading } from "@/components/templates/shata-cafe/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-cafe/ui/Button";

const BASE = "/templates/cafe1/preview";

export default function TeamPage() {
  const config = useSite();
  const t = config.sections.team;
  const members = config.team;

  return (
    <>
      <PageBanner
        title="Meet the Kitchen"
        subtitle="The talented people behind every dish and drink."
        crumbs={[
          { label: "Home", href: BASE },
          { label: "Our Team" },
        ]}
        bg="/templates/shata-cafe/bg/about_bg.jpg"
      />

      <Container className="py-16 md:py-20">
        <div className="mb-10 max-w-xl">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <div key={member.id} className="group">
              <div className="relative h-64 overflow-hidden rounded-[var(--cafe-radius)] shadow-md group-hover:shadow-lg transition-shadow mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-bold text-sm">{member.name}</div>
                  <div className="text-[12px] text-[color:var(--cafe-accent)] font-medium">{member.role}</div>
                </div>
              </div>
              {member.bio && (
                <p className="text-[13px] text-[color:var(--cafe-muted)] leading-5">{member.bio}</p>
              )}
            </div>
          ))}
        </div>

        {/* Join us */}
        <div className="mt-20 rounded-[var(--cafe-radius)] bg-[color:var(--cafe-surface)] border border-[color:var(--cafe-border)] p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--cafe-accent)] mb-2">We're Hiring</div>
              <h2 className="text-2xl font-bold text-[color:var(--cafe-fg)]">Join the Avenue Team</h2>
              <p className="mt-3 text-[color:var(--cafe-muted)] text-sm leading-6">
                We're always looking for passionate people who love food, hospitality, and making people feel welcome. If that sounds like you, reach out.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <LinkButton href={`${BASE}/contact`}>Get in Touch →</LinkButton>
              <p className="text-[12px] text-[color:var(--cafe-muted)]">Send your CV to {config.contact.email}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
