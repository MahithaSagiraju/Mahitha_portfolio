import { usePortfolio } from "../../hooks/usePortfolio"
import { useEffect, useRef } from "react"
import ScrollReveal from "../shared/ScrollReveal"

function ProjectCard({ title, description, tags, liveUrl, githubUrl, category, index }: {
  title: string; description: string; tags?: string[]; liveUrl?: string; githubUrl?: string; category: string; index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty("--rotX", `${-y * 6}deg`)
      el.style.setProperty("--rotY", `${x * 6}deg`)
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
      el.style.setProperty("--my", `${e.clientY - rect.top}px`)
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
      <div className="card-3d-inner glass-card p-6 bg-gradient-to-b from-white/5 to-white/[0.02] glow-border card-shine group"
        style={{ transition: "transform 0.4s ease" }}>
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <h3 className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide group-hover:text-gradient transition-all duration-300">{title}</h3>
          <span className="text-white/50 font-semibold text-xs whitespace-nowrap px-3 py-1.5 rounded-full border border-white/10 bg-white/5 group-hover:bg-gradient-to-r group-hover:from-blue-500/15 group-hover:to-purple-500/15 group-hover:border-purple-400/30 transition-all duration-300">
            {tags?.[0] || category}
          </span>
        </div>
        <p className="text-white/55 text-sm leading-relaxed mb-5">{description}</p>
        <div className="flex flex-wrap gap-2">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" className="btn-primary text-xs !px-4 !py-2.5">
              <span>Live Demo</span>
              <svg className="w-3.5 h-3.5 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs !px-4 !py-2.5">
              <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { projects } = usePortfolio()

  return (
    <section id="projects" className="py-24 scroll-mt-[86px] relative">
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10" style={{ maxWidth: "var(--container, 1100px)" }}>
        <ScrollReveal>
          <header className="mb-10">
            <div className="section-label mb-4 w-fit">Projects</div>
            <h2 className="section-heading">Things I've built</h2>
            <p className="section-subtitle mt-2">Projects that showcase my work with APIs and responsive UI.</p>
          </header>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <ProjectCard key={project._id} title={project.title} description={project.description} tags={project.tags} liveUrl={project.liveUrl} githubUrl={project.githubUrl} category={project.category} index={idx} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
