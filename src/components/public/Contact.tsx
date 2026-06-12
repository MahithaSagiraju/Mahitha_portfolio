import { usePortfolio } from "../../hooks/usePortfolio"
import { useState } from "react"

export default function Contact() {
  const { settings } = usePortfolio()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [hint, setHint] = useState("This form is local-only (no backend). It will open your email app.")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact — ${name || "Hello"}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`)
    const mailto = `mailto:${encodeURIComponent(settings?.email || "")}?subject=${subject}&body=${body}`
    window.location.href = mailto
    setHint("Opening your email app… (you can edit before sending)")
  }

  if (!settings) return null

  return (
    <section id="contact" className="py-20 scroll-mt-[86px] border-t border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-white/[0.01]">
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <header className="mb-6">
          <h2 className="section-heading">Contact</h2>
          <p className="section-subtitle">Have an opportunity or want to collaborate? Send a message.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-4 items-start">
          <form onSubmit={handleSubmit} className="glass-card p-5">
            <div className="grid gap-2 mb-4">
              <label className="font-bold text-white/80">Name</label>
              <input type="text" placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50 focus:bg-black/30 transition-all" />
            </div>
            <div className="grid gap-2 mb-4">
              <label className="font-bold text-white/80">Email</label>
              <input type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50 focus:bg-black/30 transition-all" />
            </div>
            <div className="grid gap-2 mb-4">
              <label className="font-bold text-white/80">Message</label>
              <textarea rows={5} placeholder="Write your message..." required value={message} onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50 focus:bg-black/30 transition-all resize-none" />
            </div>
            <button type="submit" className="inline-flex items-center justify-center px-4 py-3 rounded-[16px] border border-white/10 bg-gradient-to-r from-blue-400/95 to-purple-400/80 text-white/95 font-bold shadow-[0_18px_40px_rgba(96,165,250,0.16)] hover:-translate-y-0.5 hover:brightness-105 transition-all">
              Send Message
            </button>
            <p className="mt-3 text-white/60 text-sm">{hint}</p>
          </form>

          <aside className="grid gap-4">
            <div className="glass-card p-5 bg-gradient-to-b from-emerald-500/5 to-purple-500/5">
              <h3 className="text-lg font-['Plus_Jakarta_Sans'] -tracking-wide">Social</h3>
              <p className="text-white/70 mt-1">Connect with me and see my work.</p>
              <div className="mt-3 grid gap-2">
                <a href={settings.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-[16px] border border-white/10 bg-white/5 text-white/80 hover:-translate-y-0.5 hover:bg-white/10 hover:border-emerald-500/20 transition-all">
                  <span className="h-[34px] w-[34px] rounded-[14px] flex items-center justify-center bg-white/5 border border-white/10 font-extrabold text-sm">in</span>
                  LinkedIn
                </a>
                <a href={settings.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-[16px] border border-white/10 bg-white/5 text-white/80 hover:-translate-y-0.5 hover:bg-white/10 hover:border-emerald-500/20 transition-all">
                  <span className="h-[34px] w-[34px] rounded-[14px] flex items-center justify-center bg-white/5 border border-white/10 font-extrabold text-sm">GH</span>
                  GitHub
                </a>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-3 p-3 rounded-[16px] border border-white/10 bg-white/5 text-white/80 hover:-translate-y-0.5 hover:bg-white/10 hover:border-emerald-500/20 transition-all">
                  <span className="h-[34px] w-[34px] rounded-[14px] flex items-center justify-center bg-white/5 border border-white/10 font-extrabold text-sm">@</span>
                  Email
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                {settings.resumeUrl && (
                  <a href={settings.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-3 py-2 rounded-[14px] border border-white/10 bg-white/5 text-white/90 font-bold text-sm hover:bg-white/10 transition-all">
                    Download Resume
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
