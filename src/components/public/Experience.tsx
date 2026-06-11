import { usePortfolio } from "../../hooks/usePortfolio"

export default function Experience() {
  const { experiences } = usePortfolio()

  return (
    <section id="experience" className="py-20 scroll-mt-[86px]">
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <header className="mb-6">
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl -tracking-wide">Experience</h2>
          <p className="text-white/60">Internship experience focused on frontend and AI work.</p>
        </header>

        <div className="relative grid gap-4 pl-4">
          <div className="absolute left-[7px] top-1 bottom-1 w-[2px] rounded-full bg-white/10" />
          {experiences.map((exp) => (
            <div key={exp._id} className="relative grid grid-cols-[22px_1fr] gap-3 items-start">
              <div className="h-3.5 w-3.5 rounded-full mt-[18px] bg-gradient-to-r from-blue-400 to-purple-400 shadow-[0_0_0_5px_rgba(96,165,250,0.12)]" />
              <div className="glass-card p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide">{exp.role} — {exp.company}</h3>
                  <span className="text-white/60 font-bold whitespace-nowrap text-sm">{exp.startDate}{exp.endDate && exp.endDate !== exp.startDate ? `–${exp.endDate}` : ""}</span>
                </div>
                <ul className="mt-3 pl-4 text-white/70 grid gap-1.5 list-disc">
                  {exp.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
