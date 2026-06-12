import { usePortfolio } from "../../hooks/usePortfolio"

const chipSkills = ["C", "Java", "SQL", "Problem Solving", "Leadership"]

export default function Skills() {
  const { skills } = usePortfolio()

  return (
    <section id="skills" className="py-20 scroll-mt-[86px] border-t border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-white/[0.01]">
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <header className="mb-6">
          <h2 className="section-heading">Skills</h2>
          <p className="section-subtitle">Tools and strengths I use to build, learn, and lead.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div key={skill._id} className="glass rounded-[18px] p-4 border border-white/10 hover:-translate-y-1 hover:bg-white/[0.055] hover:border-purple-500/20 transition-all">
              <div className="flex items-center gap-3">
                <div className="h-[42px] w-[42px] rounded-[16px] flex items-center justify-center bg-blue-400/10 border border-blue-400/20">
                  <span>{skill.icon}</span>
                </div>
                <h3 className="text-base -tracking-wide">{skill.name}</h3>
              </div>
              <p className="mt-3 mb-3 text-white/70 text-sm">{skill.category}</p>
              <div className="h-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400/95 to-purple-400/90 animate-[barIn_0.9s_ease_forwards]"
                  style={{ width: `${skill.proficiency}%`, transform: "translateX(-8px)", animationFillMode: "forwards" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {chipSkills.map((s) => (
            <span key={s} className="inline-flex items-center px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-semibold hover:-translate-y-0.5 hover:bg-white/10 transition-all">{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
