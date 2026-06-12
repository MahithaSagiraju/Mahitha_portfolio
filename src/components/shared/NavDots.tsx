import { useEffect, useState } from "react"

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
]

export default function NavDots() {
  const [active, setActive] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + 120
      let current = "home"
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop <= y) current = s.id
      }
      setActive(current)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          title={s.label}
          className="group flex items-center gap-3"
        >
          <span className="text-[10px] text-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{s.label}</span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === s.id
                ? "w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        </a>
      ))}
    </nav>
  )
}
