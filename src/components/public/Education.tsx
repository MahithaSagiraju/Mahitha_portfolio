import { usePortfolio } from "../../hooks/usePortfolio"
import ScrollReveal from "../shared/ScrollReveal"

export default function Education() {
  const { settings } = usePortfolio()
  if (!settings?.education) return null

  return (
    <section id="education" className="py-24 scroll-mt-[86px] border-t border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-white/[0.01] relative">
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10" style={{ maxWidth: "var(--container, 1100px)" }}>
        <ScrollReveal>
          <header className="mb-10">
            <div className="section-label mb-4 w-fit">Education</div>
            <h2 className="section-heading">Academic background</h2>
            <p className="section-subtitle mt-2">My learning journey and achievements.</p>
          </header>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {settings.education.map((edu, i) => (
            <ScrollReveal key={i} delay={0.1 * i}>
              <div className="glass-card p-6 group hover:border-purple-500/25 transition-all duration-300 card-shine">
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-blue-400/15 to-purple-400/15 border border-blue-400/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-purple-400/30 transition-all duration-300">
                  <span className="text-lg">🎓</span>
                </div>
                <h3 className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide mb-2 group-hover:text-gradient transition-all duration-300">{edu.degree}</h3>
                <p className="text-white/60 font-semibold text-sm mb-1">{edu.institution}</p>
                <p className="text-blue-300/70 text-sm font-bold mb-3">
                  {edu.period ? `${edu.period} \u2022 ` : ""}
                  <span className="text-gradient">{edu.score}</span>
                </p>
                <p className="text-white/50 text-sm leading-relaxed">{edu.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
