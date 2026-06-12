import { usePortfolio } from "../../hooks/usePortfolio"
import { useRef, useEffect } from "react"
import ScrollReveal from "../shared/ScrollReveal"

const chipSkills = ["C", "Java", "SQL", "Problem Solving", "Leadership"]

function SkillCard({ name, icon, proficiency, category, index }: { name: string; icon: string; proficiency: number; category: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty("--rotX", `${-y * 8}deg`)
      el.style.setProperty("--rotY", `${x * 8}deg`)
    }
    const handleLeave = () => {
      el.style.setProperty("--rotX", "0deg")
      el.style.setProperty("--rotY", "0deg")
    }
    el.addEventListener("pointermove", handleMove)
    el.addEventListener("pointerleave", handleLeave)
    return () => { el.removeEventListener("pointermove", handleMove); el.removeEventListener("pointerleave", handleLeave) }
  }, [])

  return (
    <div ref={cardRef} className="card-3d">
      <div className="card-3d-inner glass rounded-[18px] p-5 border border-white/10 card-shine group transition-all duration-500 hover:border-purple-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-[46px] w-[46px] rounded-[14px] flex items-center justify-center bg-gradient-to-br from-blue-400/15 to-purple-400/15 border border-blue-400/20 group-hover:border-purple-400/30 group-hover:shadow-lg group-hover:shadow-purple-500/10 transition-all duration-300">
            <span className="text-xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
          </div>
          <h3 className="font-bold text-base group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text transition-all duration-300">{name}</h3>
        </div>
        <p className="text-white/50 text-sm mb-3">{category}</p>
        <div className="h-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-400 relative overflow-hidden"
            style={{ width: `${proficiency}%`, animation: "barIn 1s ease 0.3s forwards", transform: "translateX(-100%)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" style={{ backgroundSize: "200% 100%" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const { skills } = usePortfolio()

  return (
    <section id="skills" className="py-24 scroll-mt-[86px] border-t border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-white/[0.01] relative">
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10" style={{ maxWidth: "var(--container, 1100px)" }}>
        <ScrollReveal>
          <header className="mb-10">
            <div className="section-label mb-4 w-fit">Skills</div>
            <h2 className="section-heading">Tools and strengths I use to build</h2>
            <p className="section-subtitle mt-2">From frontend to AI — technologies I work with daily.</p>
          </header>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skills.map((skill, idx) => (
              <SkillCard key={skill._id} name={skill.name} icon={skill.icon} proficiency={skill.proficiency} category={skill.category} index={idx} />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {chipSkills.map((s, idx) => (
              <span key={s} className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-semibold hover:bg-gradient-to-r hover:from-blue-500/15 hover:to-purple-500/15 hover:border-purple-400/30 hover:text-white/90 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300">
                {s}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
