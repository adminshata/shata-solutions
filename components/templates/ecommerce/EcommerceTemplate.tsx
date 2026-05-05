import type { EcommerceTemplateData, TemplateSectionType } from "@/lib/templates/types";
import TemplateShell from "@/components/templates/shared/TemplateShell";

type EcommerceTemplateProps = {
  data: EcommerceTemplateData;
};

export default function EcommerceTemplate({ data }: EcommerceTemplateProps) {
  const enabledSections = [...data.sections]
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <TemplateShell brand={data.brand}>
      <div className="min-h-screen">
        <StoreHeader data={data} />

        {enabledSections.map((section) => (
          <TemplateSection key={section.id} sectionId={section.id} data={data} />
        ))}
      </div>
    </TemplateShell>
  );
}

function TemplateSection({ sectionId, data }: { sectionId: TemplateSectionType; data: EcommerceTemplateData }) {
  switch (sectionId) {
    case "hero":
      return <HeroSection data={data} />;
    case "categories":
      return <CategoriesSection data={data} />;
    case "featuredProducts":
      return <ProductsSection data={data} />;
    case "promoBanner":
      return <PromoSection data={data} />;
    case "trust":
      return <TrustSection />;
    case "contact":
      return <ContactSection data={data} />;
    default:
      return null;
  }
}

function StoreHeader({ data }: { data: EcommerceTemplateData }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--template-primary)] text-sm font-black text-white">
            {data.brand.logoText}
          </div>
          <div>
            <div className="text-lg font-black tracking-[-0.04em]">{data.brand.name}</div>
            <div className="text-xs text-slate-500">Online store template</div>
          </div>
        </div>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="rounded-full bg-slate-950 px-5 py-2.5 text-xs font-black text-white">
          Cart
        </button>
      </div>
    </header>
  );
}

function HeroSection({ data }: { data: EcommerceTemplateData }) {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,color-mix(in_srgb,var(--template-primary)_24%,transparent),transparent_36%),radial-gradient(circle_at_80%_35%,color-mix(in_srgb,var(--template-accent)_18%,transparent),transparent_34%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--template-primary)] shadow-sm">
            {data.hero.badge}
          </div>
          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.07em] md:text-7xl">
            {data.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{data.hero.subcopy}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#products" className="inline-flex justify-center rounded-full bg-[var(--template-primary)] px-7 py-4 text-sm font-black text-white shadow-xl">
              {data.hero.ctaLabel}
            </a>
            <a href="#categories" className="inline-flex justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-800">
              Browse categories
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[3rem] bg-[var(--template-primary)]/20 blur-3xl" />
          <div className="relative rounded-[2.5rem] border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {data.products.slice(0, 2).map((product, index) => (
                <ProductCard key={product.id} product={product} large={index === 0} />
              ))}
            </div>
            <div className="mt-4 rounded-[2rem] bg-slate-950 p-5 text-white">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[var(--template-accent)]">Checkout ready</div>
              <div className="mt-3 text-3xl font-black tracking-[-0.05em]">Secure cart, offers, and product cards included.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection({ data }: { data: EcommerceTemplateData }) {
  return (
    <section id="categories" className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Categories" title="Shop by collection." />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {data.categories.map((category) => (
            <div key={category.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-28 rounded-[1.5rem] bg-gradient-to-br from-[var(--template-primary)] to-[var(--template-accent)]" />
              <h3 className="mt-5 text-2xl font-black tracking-[-0.04em]">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection({ data }: { data: EcommerceTemplateData }) {
  return (
    <section id="products" className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Featured products" title="Product cards designed to sell." />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoSection({ data }: { data: EcommerceTemplateData }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white md:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-[var(--template-accent)]">Limited launch offer</div>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.06em] md:text-6xl">
              Build campaigns around your best products.
            </h2>
            <p className="mt-5 max-w-xl text-white/65">
              Use this section for discounts, seasonal offers, bundles, or new collection drops.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-5 text-slate-950">
            <div className="text-sm font-black text-slate-400">Featured collection</div>
            <div className="mt-4 text-3xl font-black tracking-[-0.05em]">{data.categories[0]?.name ?? "Collection"}</div>
            <button className="mt-6 rounded-full bg-[var(--template-primary)] px-5 py-3 text-sm font-black text-white">
              View offer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {["Secure checkout", "Fast fulfillment", "Mobile-first design"].map((item) => (
          <div key={item} className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-950" />
            <div className="mt-4 text-xl font-black tracking-[-0.04em]">{item}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ data }: { data: EcommerceTemplateData }) {
  return (
    <section id="contact" className="px-6 py-16">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <SectionTitle eyebrow="Contact" title="Ready for customers." />
        <div className="mt-6 grid gap-4 text-sm text-slate-600 md:grid-cols-3">
          <div>{data.contact.phone}</div>
          <div>{data.contact.email}</div>
          <div>{data.contact.address}</div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, large = false }: { product: EcommerceTemplateData["products"][number]; large?: boolean }) {
  return (
    <div className={`rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm ${large ? "sm:row-span-2" : ""}`}>
      <div className="flex h-44 items-end rounded-[1.5rem] bg-gradient-to-br from-[var(--template-primary)] via-blue-500 to-[var(--template-accent)] p-4">
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-950">{product.badge}</span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">{product.category}</div>
          <h3 className="mt-2 text-xl font-black tracking-[-0.04em]">{product.name}</h3>
        </div>
        <div className="text-lg font-black text-[var(--template-primary)]">{product.price}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
      <button className="mt-5 w-full rounded-full bg-slate-950 py-3 text-xs font-black text-white">
        Add to cart
      </button>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="text-xs font-black uppercase tracking-[0.2em] text-[var(--template-primary)]">{eyebrow}</div>
      <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.06em] md:text-5xl">{title}</h2>
    </div>
  );
}
