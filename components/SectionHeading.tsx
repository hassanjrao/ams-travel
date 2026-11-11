type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
};

export default function SectionHeading({ eyebrow, title, subtitle, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className={`text-sm font-bold uppercase tracking-[0.2em] ${dark ? "text-gold-light" : "text-gold-dark"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 font-display text-3xl font-semibold sm:text-4xl ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-4 text-lg ${dark ? "text-white/70" : "text-ink-soft"}`}>{subtitle}</p>}
    </div>
  );
}
