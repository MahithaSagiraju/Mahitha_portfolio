import { usePortfolio } from "../../hooks/usePortfolio"

export default function Education() {
  const { settings } = usePortfolio()
  if (!settings?.education) return null

  return (
    <section id="education" className="py-20 scroll-mt-[86px] border-t border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-white/[0.01]">
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <header className="mb-6">
          <h2 className="section-heading">Education</h2>
          <p className="section-subtitle">Academic background and achievements.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {settings.education.map((edu, i) => (
            <div key={i} className="glass-card p-5 hover:-translate-y-1 hover:border-purple-500/20 hover:bg-white/[0.055] transition-all">
              <h3 className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide mb-1">{edu.degree} — {edu.institution}</h3>
              <p className="text-white/70 font-bold mb-2">{(edu.period ? `${edu.period} • ` : "") + edu.score}</p>
              <p className="text-white/70 text-sm">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
