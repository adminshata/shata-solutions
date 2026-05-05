"use client";

type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
};

export default function TextInput({ label, value, onChange, textarea }: TextInputProps) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/70"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/70"
        />
      )}
    </label>
  );
}
