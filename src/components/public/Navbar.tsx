import { useEffect, useState } from "react"
import { usePortfolio } from "../../hooks/usePortfolio"

const sections = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

const themes = ["theme-dark", "theme-light", "theme-ocean"]
const themeLabels: Record<string, string> = {
  "theme-dark": "Dark",
  "theme-light": "Light",
  "theme-ocean": "Ocean",
}

export default function Navbar() {
  const { settings } = usePortfolio()
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState("theme-dark")

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme")
    const initialTheme = themes.includes(stored || "") ? stored! : "theme-dark"
    setTheme(initialTheme)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove(...themes)
    root.classList.add(theme)
    window.localStorage.setItem("portfolio-theme", theme)
  }, [theme])

  if (!settings) return null

  const nextTheme = () => {
    const currentIndex = themes.indexOf(theme)
    return themes[(currentIndex + 1) % themes.length]
  }

  return (
    <header
      style={{
        backgroundColor: "var(--header-bg)",
        borderColor: "var(--header-border)",
        boxShadow: "var(--header-shadow)",
      }}
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
    >
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <div className="relative flex h-[78px] items-center justify-between gap-4">
          <a href="#home" className="inline-flex items-center gap-3 font-semibold text-sm tracking-[0.18em] uppercase text-[var(--text)]">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-black text-slate-950 shadow-[0_15px_30px_rgba(96,165,250,0.22)]">M</span>
            {settings.name}
          </a>

          <nav className="hidden md:flex items-center gap-4 text-sm text-[var(--muted)]">
            {sections.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-[var(--text)] transition-colors duration-200">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(nextTheme())}
              className="rounded-full border px-4 py-2 text-sm font-semibold transition hover:brightness-110"
              style={{
                backgroundColor: "var(--button-bg)",
                borderColor: "var(--button-border)",
                color: "var(--button-text)",
              }}
            >
              {themeLabels[theme]}
            </button>
            <a
              href={settings.resumeUrl || "#contact"}
              target={settings.resumeUrl ? "_blank" : "_self"}
              rel="noreferrer noopener"
              className="rounded-full border px-4 py-2 text-sm font-semibold transition hover:brightness-110 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--button-bg)",
                borderColor: "var(--button-border)",
                color: "var(--button-text)",
              }}
            >
              Resume
            </a>
            <a href="#contact" className="rounded-full bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_12px_28px_rgba(96,165,250,0.22)] transition hover:brightness-105">
              Contact
            </a>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border px-3 text-[var(--text)] transition focus:outline-none md:hidden"
            style={{
              backgroundColor: "var(--button-bg)",
              borderColor: "var(--button-border)",
            }}
          >
            <span className="text-sm font-semibold">{menuOpen ? "×" : "☰"}</span>
          </button>

          {menuOpen && (
            <div
              className="absolute inset-x-4 top-full mt-3 rounded-[28px] border p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden"
              style={{
                backgroundColor: "var(--header-bg)",
                borderColor: "var(--header-border)",
              }}
            >
              <nav className="grid gap-3 text-sm text-[var(--muted)]">
                {sections.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 hover:bg-[var(--button-hover-bg)] transition"
                    style={{ color: "var(--text)" }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 grid gap-3">
                {settings.resumeUrl && (
                  <a
                    href={settings.resumeUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition hover:brightness-110"
                    style={{
                      backgroundColor: "var(--button-bg)",
                      borderColor: "var(--button-border)",
                      color: "var(--button-text)",
                    }}
                  >
                    Resume
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:brightness-105"
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
