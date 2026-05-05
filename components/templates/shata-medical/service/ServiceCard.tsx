"use client";

import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/shata-medical/types";
import { ServiceBadge } from "@/components/templates/shata-medical/ui/Atoms";

export function ServiceCard({ service, basePath }: { service: Service; basePath: string }) {
  const href = `${basePath}/services/${service.handle}`;
  const image = service.images[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <Link href={href} className="relative block h-48 overflow-hidden bg-[color:var(--med-surface)]">
        {image && (
          <Image
            src={image}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            unoptimized
          />
        )}
        {service.badge && (
          <div className="absolute left-3 top-3">
            <ServiceBadge kind={service.badge} />
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Icon + dept */}
        <div className="flex items-center gap-2 mb-2">
          {service.icon && (
            <span className="flex h-8 w-8 items-center justify-center rounded bg-[color:var(--med-surface)] p-1.5">
              <Image src={service.icon} alt="" width={20} height={20} unoptimized />
            </span>
          )}
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-primary)]">
            {service.department ?? service.category}
          </span>
        </div>

        <Link href={href}>
          <h3 className="text-lg font-bold text-[color:var(--med-fg)] hover:text-[color:var(--med-primary)] transition-colors leading-tight">
            {service.name}
          </h3>
        </Link>

        {service.shortDescription && (
          <p className="mt-2 text-sm text-[color:var(--med-muted)] leading-6 line-clamp-2">
            {service.shortDescription}
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="text-[13px] text-[color:var(--med-muted)]">
            {service.duration && <span>⏱ {service.duration}</span>}
            {service.duration && service.priceLabel && <span className="mx-2 text-[color:var(--med-border)]">·</span>}
            {service.priceLabel && (
              <span className="font-semibold text-[color:var(--med-primary)]">{service.priceLabel}</span>
            )}
          </div>
          <Link
            href={href}
            className="text-[13px] font-semibold text-[color:var(--med-primary)] hover:underline"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServiceGrid({ services, basePath }: { services: Service[]; basePath: string }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((s) => (
        <ServiceCard key={s.id} service={s} basePath={basePath} />
      ))}
    </div>
  );
}
