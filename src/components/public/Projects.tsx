import { usePortfolio } from "../../hooks/usePortfolio"

export default function Projects() {
  const { projects } = usePortfolio()

  return (
    <section id="projects" className="py-20 scroll-mt-[86px]">
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <header className="mb-6">
          <h2 className="section-heading">Projects</h2>
          <p className="section-subtitle">A couple of projects that show my work with APIs and responsive UI.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="glass-card p-5 bg-gradient-to-b from-white/5 to-white/[0.03] hover:-translate-y-1.5 hover:border-blue-400/20 hover:bg-gradient-to-b hover:from-blue-400/10 hover:to-purple-400/5 transition-all">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide">{project.title}</h3>
                <span className="text-white/70 font-semibold text-sm whitespace-nowrap px-2 py-1 rounded-full border border-white/10 bg-white/5">{project.tags?.[0] || project.category}</span>
              </div>
              <p className="mt-3 mb-4 text-white/70">{project.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {(project.tags ?? []).slice(0, 4).map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-3 py-2 rounded-[14px] border border-white/10 bg-gradient-to-r from-blue-400/95 to-purple-400/80 text-white/95 font-bold text-sm shadow-[0_18px_40px_rgba(96,165,250,0.16)] hover:-translate-y-0.5 hover:brightness-105 transition-all">
                    Live
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-3 py-2 rounded-[14px] border border-white/10 bg-white/5 text-white/90 font-bold text-sm hover:bg-white/10 transition-all">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
