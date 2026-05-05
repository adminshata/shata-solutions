"use client";

import Image from "next/image";
import Link from "next/link";
import type { Doctor } from "@/lib/shata-medical/types";

export function DoctorCard({ doctor, basePath }: { doctor: Doctor; basePath: string }) {
  const href = `${basePath}/doctors/${doctor.handle}`;
  return (
    <article className="group overflow-hidden rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link href={href} className="relative block h-64 overflow-hidden bg-[color:var(--med-surface)]">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          unoptimized
        />
        {/* Blue overlay on hover */}
        <div className="absolute inset-0 bg-[color:var(--med-primary)]/0 group-hover:bg-[color:var(--med-primary)]/20 transition-all duration-300" />
      </Link>
      <div className="p-4 text-center">
        <Link href={href}>
          <h3 className="font-bold text-[color:var(--med-fg)] hover:text-[color:var(--med-primary)] transition-colors">
            {doctor.name}
          </h3>
        </Link>
        <p className="mt-0.5 text-[13px] font-medium text-[color:var(--med-primary)]">{doctor.specialty}</p>
        {doctor.availability && (
          <p className="mt-1 text-[11px] text-[color:var(--med-muted)]">⏰ {doctor.availability}</p>
        )}
        <Link
          href={`${basePath}/appointment/request?doctor=${doctor.handle}`}
          className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-[var(--med-radius)] border border-[color:var(--med-primary)] px-3 py-1.5 text-[13px] font-semibold text-[color:var(--med-primary)] hover:bg-[color:var(--med-primary)] hover:text-white transition-colors"
        >
          Book with {doctor.name.split(" ")[1]}
        </Link>
      </div>
    </article>
  );
}

export function DoctorGrid({ doctors, basePath }: { doctors: Doctor[]; basePath: string }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {doctors.map((d) => (
        <DoctorCard key={d.id} doctor={d} basePath={basePath} />
      ))}
    </div>
  );
}
