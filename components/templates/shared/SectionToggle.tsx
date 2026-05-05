"use client";

type SectionToggleProps = {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

export default function SectionToggle({ label, enabled, onChange }: SectionToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
        enabled
          ? "border-cyan-400/50 bg-cyan-400/10 text-white"
          : "border-white/10 bg-white/[0.04] text-white/55"
      }`}
    >
      <span>{label}</span>
      <span className={`h-5 w-9 rounded-full p-0.5 transition ${enabled ? "bg-cyan-400" : "bg-white/15"}`}>
        <span className={`block h-4 w-4 rounded-full bg-white transition ${enabled ? "translate-x-4" : "translate-x-0"}`} />
      </span>
    </button>
  );
}
