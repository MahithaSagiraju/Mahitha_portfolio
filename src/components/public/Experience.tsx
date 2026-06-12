import { usePortfolio } from "../../hooks/usePortfolio"
import ScrollReveal from "../shared/ScrollReveal"

export default function Experience() {
  const { experiences } = usePortfolio()

  return (
    <section id="experience" className="py-24 scroll-mt-[86px] relative">
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <ScrollReveal>
          <header className="mb-10">
            <div className="section-label mb-4 w-fit">Experience</div>
            <h2 className="section-heading">Internship experience</h2>
            <p className="section-subtitle mt-2">Real-world exposure to frontend and AI work.</p>
          </header>
        </ScrollReveal>

        <div className="relative grid gap-5 pl-6">
          <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-400/40 via-purple-400/40 to-transparent rounded-full" />
          {experiences.map((exp, idx) => (
            <ScrollReveal key={exp._id} delay={0.1 * idx}>
              <div className="relative grid grid-cols-[28px_1fr] gap-4 items-start">
                <div className="relative flex items-center justify-center mt-5">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-[0_0_0_4px_rgba(96,165,250,0.12)]" />
                  <div className="absolute h-6 w-6 rounded-full bg-blue-400/20 animate-ping" style={{ animationDuration: "2s" }} />
                </div>
                <div className="glass-card p-6 group hover:border-blue-400/20 transition-all duration-300">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide group-hover:text-gradient transition-all duration-300">{exp.role} <span className="text-white/50">—</span> <span className="text-white/70">{exp.company}</span></h3>
                    <span className="text-white/50 font-bold whitespace-nowrap text-sm px-3 py-1 rounded-full border border-white/10 bg-white/5">{exp.startDate}{exp.endDate && exp.endDate !== exp.startDate ? `–${exp.endDate}` : ""}</span>
                  </div>
                  <ul className="mt-3 grid gap-2">
                    {exp.description.map((d, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400/60 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
