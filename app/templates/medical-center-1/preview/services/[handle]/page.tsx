"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useSite } from "@/lib/shata-medical/context";
import { findService, activeServices } from "@/lib/shata-medical/utils";
import { Container, PageBanner, ServiceBadge } from "@/components/templates/shata-medical/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-medical/ui/Button";
import { ServiceCard } from "@/components/templates/shata-medical/service/ServiceCard";

const BASE_PATH = "/templates/medical-center-1/preview";

export default function ServiceDetailPage() {
  const params = useParams<{ handle: string }>();
  const handle = params?.handle ?? "";
  const config = useSite();
  const service = findService(config, handle);
  if (!service) notFound();

  const related = activeServices(config)
    .filter((s) => s.id !== service!.id && s.category === service!.category)
    .slice(0, 3);

  const allOthers = activeServices(config).filter((s) => s.id !== service!.id).slice(0, 6);

  return (
    <>
      <PageBanner
        title={service!.name}
        subtitle={service!.shortDescription}
        crumbs={[
          { label: "Home", href: BASE_PATH },
          { label: "Services", href: `${BASE_PATH}/services` },
          { label: service!.name },
        ]}
        bg="/templates/shata-medical/bg/page_heading_bg.jpg"
      />

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div>
            {/* Hero image */}
            {service!.images[0] && (
              <div className="relative h-64 md:h-80 overflow-hidden rounded-[var(--med-radius)] mb-8">
                <Image
                  src={service!.images[0]}
                  alt={service!.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  unoptimized
                />
                {service!.badge && (
                  <div className="absolute left-4 top-4">
                    <ServiceBadge kind={service!.badge} />
                  </div>
                )}
              </div>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-[color:var(--med-muted)]">
              {service!.department && (
                <span className="flex items-center gap-1.5">
                  <span className="text-[color:var(--med-primary)]">🏥</span>
                  <span className="font-semibold text-[color:var(--med-fg)]">{service!.department}</span>
                </span>
              )}
              {service!.duration && (
                <span className="flex items-center gap-1.5">
                  <span>⏱</span> {service!.duration}
                </span>
              )}
              {service!.priceLabel && (
                <span className="flex items-center gap-1.5 font-semibold text-[color:var(--med-primary)]">
                  <span>💳</span> {service!.priceLabel}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-[color:var(--med-fg)] mb-4">About This Service</h2>
            <p className="text-[color:var(--med-muted)] leading-7 whitespace-pre-line">{service!.description}</p>

            {/* Highlights */}
            {service!.highlights && service!.highlights.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-[color:var(--med-fg)] mb-4">What's Included</h3>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {service!.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--med-primary)]/10 text-[color:var(--med-primary)] text-xs">✓</span>
                      <span className="text-sm text-[color:var(--med-fg)]">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Second image */}
            {service!.images[1] && (
              <div className="relative mt-10 h-64 md:h-80 overflow-hidden rounded-[var(--med-radius)]">
                <Image
                  src={service!.images[1]}
                  alt={`${service!.name} – additional`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* CTA card */}
            <div className="rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-muted)] mb-3">
                Book a consultation
              </div>
              <p className="text-sm text-[color:var(--med-muted)] mb-4 leading-6">
                Ready to take the next step? Book an appointment with one of our {service!.department?.toLowerCase()} specialists today.
              </p>
              <LinkButton
                href={`${BASE_PATH}/appointment/request?service=${service!.handle}`}
                full
              >
                Book Appointment →
              </LinkButton>
              <LinkButton
                href={`${BASE_PATH}/contact`}
                variant="outline"
                full
                className="mt-2"
              >
                Ask a Question
              </LinkButton>
            </div>

            {/* All services list */}
            <div className="rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-white p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-muted)] mb-3">
                All Services
              </div>
              <ul className="space-y-1">
                {allOthers.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`${BASE_PATH}/services/${s.handle}`}
                      className={`flex items-center justify-between py-1.5 text-sm transition-colors hover:text-[color:var(--med-primary)] ${
                        s.id === service!.id
                          ? "font-semibold text-[color:var(--med-primary)]"
                          : "text-[color:var(--med-fg)]"
                      }`}
                    >
                      {s.name}
                      <span className="text-[color:var(--med-border)]">›</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency */}
            {config.contact.emergencyPhone && (
              <div className="rounded-[var(--med-radius)] bg-red-50 border border-red-100 p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-500 mb-2">
                  Emergency?
                </div>
                <a
                  href={`tel:${config.contact.emergencyPhone}`}
                  className="text-lg font-bold text-red-600 hover:underline"
                >
                  {config.contact.emergencyPhone}
                </a>
                <p className="text-[12px] text-red-400 mt-0.5">Available 24/7</p>
              </div>
            )}
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-[color:var(--med-fg)] mb-6">
              More in {service!.department}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.id} service={s} basePath={BASE_PATH} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
