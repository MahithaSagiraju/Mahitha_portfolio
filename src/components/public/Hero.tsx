import { useEffect, useRef, useState } from "react"
import { usePortfolio } from "../../hooks/usePortfolio"

const phrases = [
  "AI Engineer & Full Stack Developer",
  "AI Engineer",
  "Full Stack Developer",
]

export default function Hero() {
  const { settings } = usePortfolio()
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [i, setI] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const full = phrases[i % phrases.length]
    const speed = isDeleting ? 34 : 52
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setText(full.slice(0, Math.max(0, text.length - 1)))
        if (text.length <= 1) {
          setIsDeleting(false)
          setI((p) => (p + 1) % phrases.length)
        }
      } else {
        setText(full.slice(0, Math.min(full.length, text.length + 1)))
        if (text === full) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [text, isDeleting, i])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = []
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000))

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      })
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - dist / 120) * 0.15})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  useEffect(() => {
    const el = avatarRef.current
    if (!el) return
    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`
    }
    const handleLeave = () => {
      el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)"
    }
    el.addEventListener("pointermove", handleMove)
    el.addEventListener("pointerleave", handleLeave)
    return () => { el.removeEventListener("pointermove", handleMove); el.removeEventListener("pointerleave", handleLeave) }
  }, [])

  if (!settings) return null

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-blue-500/5 blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 relative z-10" style={{ maxWidth: "var(--container, 1100px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          <div style={{ animation: "fadeInUp 0.8s ease" }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm mb-5 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
              Open to internships & entry roles
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-6xl leading-tight -tracking-wide mb-4">
              Hi, I'm{" "}
              <span className="text-gradient-animated inline-block">{settings.name}</span>
              <span className="block text-lg sm:text-xl text-white/70 font-semibold mt-3">
                <span>{text}</span>
                <span className="inline-block w-[3px] h-[1.2em] ml-1 translate-y-[2px] rounded-full bg-blue-400 animate-[blink_900ms_ease-in-out_infinite]" />
              </span>
            </h1>

            <p className="text-white/60 max-w-[58ch] text-lg leading-relaxed">{settings.bio}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary group">
                <span>View Projects</span>
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#contact" className="btn-ghost group">
                Contact Me
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { icon: "📍", text: settings.location },
                { icon: "⚡", text: "Fast learner, consistent builder" },
                { icon: "🧠", text: "AI + Web" },
              ].map((item, idx) => (
                <div key={idx} className="inline-flex items-center gap-2 px-4 py-2 rounded-[14px] bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 hover:border-blue-400/20 hover:text-white/80 transition-all duration-300 group"
                  style={{ animation: `fadeInUp 0.6s ease ${0.1 * idx}s both` }}>
                  <span className="text-base">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-6" style={{ animation: "fadeInUp 0.8s ease 0.2s both" }}>
            <div ref={avatarRef} className="w-[min(340px,100%)] aspect-square rounded-full p-[3px] transition-transform duration-200 ease-out"
              style={{ background: "conic-gradient(from var(--angle, 0deg), #60a5fa, #a78bfa, #f472b6, #60a5fa)" }}>
              <div className="w-full h-full rounded-full border-2 border-[#071225] overflow-hidden bg-[#071225]">
                <img src="/profile.png" alt={settings.name} className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const parent = target.parentElement!
                    parent.innerHTML = '<span class="text-6xl font-bold text-gradient" style="display:flex;align-items:center;justify-content:center;height:100%">' + (settings.name?.charAt(0) || "M") + "</span>"
                  }} />
              </div>
            </div>

            <div className="w-full max-w-[380px] p-5 rounded-[18px] bg-[rgba(10,14,24,0.75)] border border-white/10 backdrop-blur-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-blue-400/20 transition-all duration-300"
              style={{ animation: "floatSlow 6s ease-in-out infinite" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-sm text-white/80">Currently learning</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "Python"].map((t, idx) => (
                  <span key={t}
                    className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-semibold hover:bg-blue-500/15 hover:border-blue-400/30 hover:text-blue-300 transition-all duration-300"
                    style={{ animation: `fadeInUp 0.5s ease ${0.1 * idx}s both` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl animate-pulse" />
            <div className="absolute -bottom-2 -left-6 w-24 h-24 rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-400/10 blur-xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>
    </section>
  )
}
