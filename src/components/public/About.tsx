import { usePortfolio } from "../../hooks/usePortfolio"

export default function About() {
  const { settings } = usePortfolio()
  if (!settings) return null

  return (
    <section id="about" className="py-20 scroll-mt-[86px]">
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <header className="mb-6">
          <h2 className="section-heading">About</h2>
          <p className="section-subtitle">A quick snapshot of who I am and what I'm aiming for.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4 items-start">
          <div className="glass-card p-5">
            <h3 className="card__title text-lg font-['Plus_Jakarta_Sans'] -tracking-wide mb-2">Student • Builder • Curious</h3>
            <p className="text-white/70">{settings.bio}</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {settings.aboutHighlights?.map((h, i) => (
                <div key={i} className="p-3 rounded-[16px] border border-white/10 bg-white/5">
                  <div className="font-extrabold -tracking-wide">{h.value}</div>
                  <div className="mt-1 text-white/60 text-sm">{h.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5 bg-gradient-to-b from-purple-500/10 to-emerald-500/5">
            <h3 className="card__title text-lg font-['Plus_Jakarta_Sans'] -tracking-wide mb-2">What I value</h3>
            <ul className="grid gap-2 mt-3">
              {settings.values?.map((v, i) => (
                <li key={i} className="grid grid-cols-[24px_1fr] gap-2 text-white/70">
                  <span className="h-[22px] w-[22px] rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs">✓</span>
                  {v}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="#contact" className="inline-flex items-center justify-center px-3 py-2 rounded-[14px] border border-white/10 bg-gradient-to-r from-blue-400/95 to-purple-400/80 text-white/95 font-bold text-sm shadow-[0_18px_40px_rgba(96,165,250,0.16)] hover:-translate-y-0.5 hover:brightness-105 transition-all">
                Hire Me
              </a>
              <a href="#projects" className="inline-flex items-center justify-center px-3 py-2 rounded-[14px] border border-white/10 bg-white/5 text-white/90 font-bold text-sm hover:bg-white/10 transition-all">
                See work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
