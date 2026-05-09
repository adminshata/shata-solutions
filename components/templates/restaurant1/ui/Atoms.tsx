"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/lib/restaurant1/context";

// ── Heading ────────────────────────────────────────────────────────────────
interface HeadingProps {
  subtitle?: string;
  title: string;
  desc?: string;
  light?: boolean;
  center?: boolean;
}

export function SectionHeading({ subtitle, title, desc, light, center = true }: HeadingProps) {
  const site = useSite();
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {subtitle && (
        <p
          className="text-sm tracking-[0.2em] uppercase mb-2 font-medium"
          style={{ color: site.theme.primaryColor }}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`text-3xl md:text-4xl font-light mb-4 ${light ? "text-white" : "text-[color:var(--r1-dark)]"}`}
        style={{ fontFamily: "var(--font-r1-heading, 'Great Vibes', cursive)" }}
      >
        {title}
      </h2>
      <div className="flex justify-center mb-4">
        <div className="w-12 h-px" style={{ background: site.theme.primaryColor }} />
        <div
          className="w-2 h-2 rounded-full mx-2 -mt-0.5"
          style={{ background: site.theme.primaryColor }}
        />
        <div className="w-12 h-px" style={{ background: site.theme.primaryColor }} />
      </div>
      {desc && (
        <p
          className={`max-w-2xl mx-auto text-base leading-relaxed ${light ? "text-gray-300" : "text-gray-600"}`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

// ── Btn ────────────────────────────────────────────────────────────────────
interface BtnProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "white" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Btn({ href, onClick, variant = "primary", size = "md", children, className = "" }: BtnProps) {
  const site = useSite();
  const sizes = { sm: "px-4 py-2 text-xs", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-sm" };
  const base = `inline-block tracking-widest uppercase font-semibold transition-all duration-300 border ${sizes[size]} ${className}`;

  let style: React.CSSProperties = {};
  let cls = "";

  if (variant === "primary") {
    style = { background: site.theme.primaryColor, borderColor: site.theme.primaryColor, color: "#fff" };
    cls = "hover:opacity-80";
  } else if (variant === "white") {
    style = { background: "#fff", borderColor: "#fff", color: site.theme.darkColor };
    cls = "hover:opacity-80";
  } else {
    style = { background: "transparent", borderColor: site.theme.primaryColor, color: site.theme.primaryColor };
    cls = "hover:opacity-80";
  }

  if (href) {
    return (
      <Link href={href} className={`${base} ${cls}`} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${cls}`} style={style}>
      {children}
    </button>
  );
}

// ── Stars ──────────────────────────────────────────────────────────────────
export function Stars({ count = 5 }: { count?: number }) {
  const site = useSite();
  return (
    <div className="flex gap-1 justify-center mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4" fill={site.theme.primaryColor} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── SafeImg ────────────────────────────────────────────────────────────────
interface SafeImgProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SafeImg({ src, alt, fill, width, height, className, style }: SafeImgProps) {
  const [error, setError] = useState(false);
  const fallback = "/templates/restaurant1/assets/images/banners/1.jpg";

  if (fill) {
    return (
      <Image
        src={error ? fallback : src}
        alt={alt}
        fill
        className={className}
        style={{ objectFit: "cover", ...style }}
        onError={() => setError(true)}
        unoptimized
      />
    );
  }
  return (
    <Image
      src={error ? fallback : src}
      alt={alt}
      width={width ?? 600}
      height={height ?? 400}
      className={className}
      style={style}
      onError={() => setError(true)}
      unoptimized
    />
  );
}

// ── PageTitle ─────────────────────────────────────────────────────────────
export function PageTitle({ title, subtitle, bg }: { title: string; subtitle?: string; bg?: string }) {
  const site = useSite();
  return (
    <div
      className="relative py-24 md:py-32 flex items-center justify-center text-center overflow-hidden"
      style={{ minHeight: 240 }}
    >
      <div className="absolute inset-0 z-0">
        {bg && (
          <Image src={bg} alt={title} fill className="object-cover" unoptimized />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10">
        {subtitle && (
          <p className="text-sm tracking-[0.2em] uppercase mb-2" style={{ color: site.theme.primaryColor }}>
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-light text-white">{title}</h1>
        <div className="flex justify-center mt-4">
          <div className="w-12 h-px bg-white/40" />
          <div className="w-2 h-2 rounded-full mx-2 -mt-0.5" style={{ background: site.theme.primaryColor }} />
          <div className="w-12 h-px bg-white/40" />
        </div>
      </div>
    </div>
  );
}
