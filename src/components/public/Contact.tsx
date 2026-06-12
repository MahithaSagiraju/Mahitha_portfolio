import { usePortfolio } from "../../hooks/usePortfolio"
import { useState } from "react"
import ScrollReveal from "../shared/ScrollReveal"

export default function Contact() {
  const { settings } = usePortfolio()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [hint, setHint] = useState("I'll open your email app for you to send.")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact \u2014 ${name || "Hello"}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`)
    const mailto = `mailto:${encodeURIComponent(settings?.email || "")}?subject=${subject}&body=${body}`
    window.location.href = mailto
    setHint("Opening your email app...")
  }

  if (!settings) return null

  return (
    <section id="contact" className="py-24 scroll-mt-[86px] border-t border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-white/[0.01] relative">
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10" style={{ maxWidth: "var(--container, 1100px)" }}>
        <ScrollReveal>
          <header className="mb-10">
            <div className="section-label mb-4 w-fit">Contact</div>
            <h2 className="section-heading">Let's work together</h2>
            <p className="section-subtitle mt-2">Have an opportunity or want to collaborate? Send a message.</p>
          </header>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass-card p-6 card-shine group">
              <div className="grid gap-2 mb-5">
                <label className="font-semibold text-white/70 text-sm">Name</label>
                <input type="text" placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-[14px] border border-white/10 bg-black/20 text-white/90 p-3.5 outline-none focus:border-blue-400/40 focus:bg-black/30 focus:shadow-[0_0_20px_rgba(96,165,250,0.08)] transition-all duration-300 placeholder:text-white/30" />
              </div>
              <div className="grid gap-2 mb-5">
                <label className="font-semibold text-white/70 text-sm">Email</label>
                <input type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[14px] border border-white/10 bg-black/20 text-white/90 p-3.5 outline-none focus:border-blue-400/40 focus:bg-black/30 focus:shadow-[0_0_20px_rgba(96,165,250,0.08)] transition-all duration-300 placeholder:text-white/30" />
              </div>
              <div className="grid gap-2 mb-6">
                <label className="font-semibold text-white/70 text-sm">Message</label>
                <textarea rows={4} placeholder="Write your message..." required value={message} onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-[14px] border border-white/10 bg-black/20 text-white/90 p-3.5 outline-none focus:border-blue-400/40 focus:bg-black/30 focus:shadow-[0_0_20px_rgba(96,165,250,0.08)] transition-all duration-300 placeholder:text-white/30 resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full">
                <span>Send Message</span>
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
              <p className="mt-4 text-white/40 text-xs text-center">{hint}</p>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <aside className="grid gap-4">
              <div className="glass-card p-6 bg-gradient-to-b from-emerald-500/5 via-emerald-500/3 to-purple-500/5 card-shine group">
                <h3 className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide mb-1">Connect with me</h3>
                <p className="text-white/50 text-sm mb-5">Find me on these platforms.</p>
                <div className="grid gap-3">
                  {[
                    { icon: "in", label: "LinkedIn", url: settings.linkedin, color: "hover:border-blue-500/30" },
                    { icon: "GH", label: "GitHub", url: settings.github, color: "hover:border-purple-500/30" },
                    { icon: "@", label: "Email", url: `mailto:${settings.email}`, color: "hover:border-emerald-500/30" },
                  ].map((s, idx) => (
                    <a key={idx} href={s.url} target="_blank" rel="noreferrer"
                      className={`flex items-center gap-3 p-3.5 rounded-[14px] border border-white/10 bg-white/5 text-white/70 hover:-translate-y-0.5 hover:bg-white/10 ${s.color} transition-all duration-300 group/link`}>
                      <span className="h-[38px] w-[38px] rounded-[12px] flex items-center justify-center bg-white/5 border border-white/10 font-extrabold text-sm group-hover/link:scale-110 group-hover/link:bg-gradient-to-br group-hover/link:from-blue-500/20 group-hover/link:to-purple-500/20 transition-all duration-300">
                        {s.icon}
                      </span>
                      <span className="font-medium">{s.label}</span>
                      <svg className="w-3.5 h-3.5 ml-auto text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-white/10">
                  {settings.resumeUrl && (
                    <a href={settings.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost text-sm w-full justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Download Resume
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
