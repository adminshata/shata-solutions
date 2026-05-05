"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useSite } from "@/lib/shata-medical/context";
import { findDoctor, activeDoctors } from "@/lib/shata-medical/utils";
import { Container, PageBanner } from "@/components/templates/shata-medical/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-medical/ui/Button";
import { DoctorCard } from "@/components/templates/shata-medical/doctor/DoctorCard";

const BASE_PATH = "/templates/medical-center-1/preview";

export default function DoctorDetailPage() {
  const params = useParams<{ handle: string }>();
  const handle = params?.handle ?? "";
  const config = useSite();
  const doctor = findDoctor(config, handle);
  if (!doctor) notFound();

  const related = activeDoctors(config)
    .filter((d) => d.id !== doctor!.id && d.department === doctor!.department)
    .slice(0, 3);

  return (
    <>
      <PageBanner
        title={doctor!.name}
        subtitle={doctor!.specialty}
        crumbs={[
          { label: "Home", href: BASE_PATH },
          { label: "Doctors", href: `${BASE_PATH}/doctors` },
          { label: doctor!.name },
        ]}
        bg="/templates/shata-medical/bg/page_heading_bg.jpg"
      />

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Doctor photo */}
            <div className="relative h-96 overflow-hidden rounded-[var(--med-radius)] shadow-md">
              <Image
                src={doctor!.image}
                alt={doctor!.name}
                fill
                className="object-cover object-top"
                sizes="320px"
                unoptimized
                priority
              />
            </div>

            {/* Quick info */}
            <div className="rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-5 space-y-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-muted)]">Specialty</div>
                <div className="mt-0.5 font-semibold text-[color:var(--med-primary)]">{doctor!.specialty}</div>
              </div>
              {doctor!.availability && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-muted)]">Availability</div>
                  <div className="mt-0.5 text-sm text-[color:var(--med-fg)]">{doctor!.availability}</div>
                </div>
              )}
              {doctor!.languages && doctor!.languages.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-muted)]">Languages</div>
                  <div className="mt-0.5 text-sm text-[color:var(--med-fg)]">{doctor!.languages.join(", ")}</div>
                </div>
              )}
              {doctor!.email && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-muted)]">Email</div>
                  <a href={`mailto:${doctor!.email}`} className="mt-0.5 text-sm text-[color:var(--med-primary)] hover:underline">
                    {doctor!.email}
                  </a>
                </div>
              )}
            </div>

            {/* Qualifications */}
            {doctor!.qualifications && doctor!.qualifications.length > 0 && (
              <div className="rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-white p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-muted)] mb-3">
                  Qualifications
                </div>
                <ul className="space-y-1.5">
                  {doctor!.qualifications.map((q) => (
                    <li key={q} className="flex items-start gap-2 text-sm text-[color:var(--med-fg)]">
                      <span className="mt-0.5 text-[color:var(--med-primary)]">🎓</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Book CTA */}
            <LinkButton
              href={`${BASE_PATH}/appointment/request?doctor=${doctor!.handle}`}
              full
              size="lg"
            >
              Book with {doctor!.name.split(" ").pop()}
            </LinkButton>
          </aside>

          {/* Main content */}
          <div>
            <h2 className="text-2xl font-bold text-[color:var(--med-fg)] mb-2">{doctor!.name}</h2>
            <p className="text-[color:var(--med-primary)] font-semibold mb-6">{doctor!.specialty}</p>

            {doctor!.shortBio && (
              <p className="text-base font-medium text-[color:var(--med-fg)] mb-4 leading-7">
                {doctor!.shortBio}
              </p>
            )}

            <h3 className="text-lg font-bold text-[color:var(--med-fg)] mb-3 mt-6">About</h3>
            <p className="text-[color:var(--med-muted)] leading-7 whitespace-pre-line">{doctor!.bio}</p>

            {/* Trust badges */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-4 text-center">
                <div className="text-2xl font-bold text-[color:var(--med-primary)]">10+</div>
                <div className="text-[11px] text-[color:var(--med-muted)] mt-0.5">Years Experience</div>
              </div>
              <div className="rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-4 text-center">
                <div className="text-2xl font-bold text-[color:var(--med-primary)]">500+</div>
                <div className="text-[11px] text-[color:var(--med-muted)] mt-0.5">Patients Treated</div>
              </div>
              <div className="rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-4 text-center">
                <div className="text-2xl font-bold text-[color:var(--med-primary)]">98%</div>
                <div className="text-[11px] text-[color:var(--med-muted)] mt-0.5">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related doctors */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-[color:var(--med-fg)] mb-6">
              Other {doctor!.specialty}s
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {related.map((d) => (
                <DoctorCard key={d.id} doctor={d} basePath={BASE_PATH} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
