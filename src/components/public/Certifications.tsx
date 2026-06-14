import { usePortfolio } from "../../hooks/usePortfolio"
import ScrollReveal from "../shared/ScrollReveal"

const certIcons = ["🎓", "🏅", "💻", "🌐", "🤖"]

export default function Certifications() {
  const { certifications } = usePortfolio()

  if (!certifications.length) return null

  return (
    <section id="certifications" className="py-24 scroll-mt-[86px] relative">
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <ScrollReveal>
          <header className="mb-10">
            <div className="section-label mb-4 w-fit">Certifications</div>
            <h2 className="section-heading">Credentials that support my learning</h2>
            <p className="section-subtitle mt-2">Certificates and achievements from courses and internships.</p>
          </header>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <div key={cert._id} className="glass-card p-5 grid grid-cols-[56px_1fr] gap-4 items-start group hover:border-blue-400/25 transition-all duration-300 card-shine">
                <div className="h-[56px] w-[56px] rounded-[16px] flex items-center justify-center bg-gradient-to-br from-blue-400/10 to-purple-400/10 border border-white/10 text-xl group-hover:scale-110 group-hover:border-purple-400/30 group-hover:shadow-lg group-hover:shadow-purple-500/10 transition-all duration-300">
                  {certIcons[i % certIcons.length]}
                </div>
                <div>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noreferrer noopener" className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide hover:text-blue-400 transition-colors block group-hover:text-gradient transition-all duration-300">
                      {cert.title}
                      <svg className="w-3.5 h-3.5 inline ml-1.5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  ) : (
                    <h3 className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide group-hover:text-gradient transition-all duration-300">{cert.title}</h3>
                  )}
                  <p className="text-white/50 text-sm mt-1">{cert.issuer}{cert.date ? ` \u2022 ${cert.date}` : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
