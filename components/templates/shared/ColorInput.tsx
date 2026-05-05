"use client";

type ColorInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">{label}</span>
      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-2">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-12 cursor-pointer rounded-xl border-0 bg-transparent"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
        />
      </div>
    </label>
  );
}
