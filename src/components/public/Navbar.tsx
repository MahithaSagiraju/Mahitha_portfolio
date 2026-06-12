import { usePortfolio } from "../../hooks/usePortfolio"

const sections = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const { settings } = usePortfolio()

  if (!settings) return null

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <div className="flex h-[78px] items-center justify-between gap-4">
          <a href="#home" className="inline-flex items-center gap-3 text-white/95 font-semibold text-sm tracking-[0.18em] uppercase">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-black text-slate-950 shadow-[0_15px_30px_rgba(96,165,250,0.22)]">M</span>
            {settings.name}
          </a>

          <nav className="hidden md:flex items-center gap-4 text-sm text-white/70">
            {sections.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white transition-colors duration-200">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a
              href={settings.resumeUrl || "#contact"}
              target={settings.resumeUrl ? "_blank" : "_self"}
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:-translate-y-0.5"
            >
              Resume
            </a>
            <a href="#contact" className="rounded-full bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_12px_28px_rgba(96,165,250,0.22)] transition hover:brightness-105">
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
