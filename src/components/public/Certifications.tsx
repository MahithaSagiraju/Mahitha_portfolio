import { usePortfolio } from "../../hooks/usePortfolio"

const certIcons = ["🎓", "🏅"]

export default function Certifications() {
  const { certifications } = usePortfolio()

  return (
    <section id="certifications" className="py-20 scroll-mt-[86px]">
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <header className="mb-6">
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl -tracking-wide">Certifications</h2>
          <p className="text-white/60">Credentials that support my learning.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <div key={cert._id} className="glass-card p-5 grid grid-cols-[54px_1fr] gap-3 items-start hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.055] transition-all">
              <div className="h-[54px] w-[54px] rounded-[18px] flex items-center justify-center bg-white/5 border border-white/10 text-xl">
                {certIcons[i] || "🎓"}
              </div>
              <div>
                {cert.url ? (
                  <a href={cert.url} target="_blank" rel="noreferrer" className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide hover:text-blue-400 transition-colors block">{cert.title}</a>
                ) : (
                  <h3 className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide">{cert.title}</h3>
                )}
                <p className="text-white/70">{cert.issuer}{cert.date ? ` • ${cert.date}` : ""}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
