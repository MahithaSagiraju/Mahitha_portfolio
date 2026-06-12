import { usePortfolio } from "../../hooks/usePortfolio"
import ScrollReveal from "../shared/ScrollReveal"
import AnimatedCounter from "../shared/AnimatedCounter"

export default function About() {
  const { settings } = usePortfolio()
  if (!settings) return null

  return (
    <section id="about" className="py-24 scroll-mt-[86px] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10" style={{ maxWidth: "var(--container, 1100px)" }}>
        <ScrollReveal>
          <header className="mb-10">
            <div className="section-label mb-4 w-fit">About</div>
            <h2 className="section-heading">A quick snapshot of who I am</h2>
          </header>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-5 items-start">
          <ScrollReveal delay={0.1}>
            <div className="glass-card p-6 card-shine group">
              <h3 className="text-xl font-['Plus_Jakarta_Sans'] -tracking-wide mb-3">Student • Builder • Curious</h3>
              <p className="text-white/65 leading-relaxed">{settings.bio}</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {settings.aboutHighlights?.map((h, i) => (
                  <div key={i} className="p-4 rounded-[16px] border border-white/10 bg-white/5 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-400/20 transition-all duration-300 group">
                    <AnimatedCounter value={h.value} />
                    <div className="mt-1 text-white/55 text-sm">{h.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="glass-card p-6 bg-gradient-to-b from-purple-500/10 via-purple-500/5 to-emerald-500/5 card-shine group">
              <h3 className="text-xl font-['Plus_Jakarta_Sans'] -tracking-wide mb-3">What I value</h3>
              <ul className="grid gap-3 mt-3">
                {settings.values?.map((v, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/65 group/item">
                    <span className="mt-0.5 h-6 w-6 rounded-lg bg-gradient-to-br from-blue-400/20 to-purple-400/20 border border-blue-400/20 flex items-center justify-center text-xs text-blue-300 group-hover/item:scale-110 transition-transform duration-200">✓</span>
                    {v}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" className="btn-primary text-sm"><span>Hire Me</span></a>
                <a href="#projects" className="btn-ghost text-sm">See work</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
