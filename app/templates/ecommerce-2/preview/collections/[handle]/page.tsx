"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useStore } from "@/lib/shata-home/context";
import { findCategory, productsInCategory } from "@/lib/shata-home/utils";
import { Breadcrumbs, Container, EmptyState, SectionHeading } from "@/components/templates/shata-home/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-home/ui/Button";
import { ProductGrid } from "@/components/templates/shata-home/product/ProductCard";

export default function CollectionPage() {
  const params = useParams<{ handle: string }>();
  const handle = params?.handle ?? "";
  const config = useStore();
  const cat = findCategory(config, handle);
  if (!cat) notFound();
  const items = productsInCategory(config, cat!.handle);

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={[
          { label: "Home", href: "/templates/ecommerce-2/preview" },
          { label: "Shop", href: "/templates/ecommerce-2/preview/shop" },
          { label: cat!.name },
        ]} />
      </Container>

      <section className="border-b border-[color:var(--store-border)]">
        <Container className="grid items-center gap-10 py-10 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Collection" title={cat!.name} subtitle={cat!.description} />
            <div className="mt-3 text-sm font-bold text-[color:var(--store-muted)]">
              {items.length} {items.length === 1 ? "product" : "products"} available
            </div>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden border border-[color:var(--store-border)] bg-[color:var(--store-surface)]">
            <Image src={cat!.image} alt={cat!.name} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" unoptimized />
          </div>
        </Container>
      </section>

      <Container className="py-10">
        {items.length === 0 ? (
          <EmptyState
            title="Nothing here yet."
            copy="This collection doesn't have any products yet. Browse the full shop."
            action={<LinkButton href="/templates/ecommerce-2/preview/shop">Browse the shop →</LinkButton>}
          />
        ) : (
          <ProductGrid products={items} />
        )}
      </Container>
    </>
  );
}
