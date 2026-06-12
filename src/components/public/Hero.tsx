import { useEffect, useRef, useState } from "react"
import { usePortfolio } from "../../hooks/usePortfolio"

const phrases = [
  "AI developer",
  "Full Stack Developer",
]

export default function Hero() {
  const { settings } = usePortfolio()
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [i, setI] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const full = phrases[i % phrases.length]
    const speed = isDeleting ? 34 : 52
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setText(full.slice(0, Math.max(0, text.length - 1)))
        if (text.length === 0) {
          setIsDeleting(false)
          setI((p) => p + 1)
        }
      } else {
        setText(full.slice(0, Math.min(full.length, text.length + 1)))
        if (text === full) {
          setTimeout(() => setIsDeleting(true), 950)
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
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.5,
      })
    }
    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)"
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      requestAnimationFrame(draw)
    }
    const anim = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(anim)
  }, [])

  if (!settings) return null
  const role = settings.title || "AI Developer"

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="container mx-auto px-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div className="animate-[fadeIn_0.7s_ease]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-[0_0_0_4px_rgba(34,197,94,0.12)]" />
              Professional portfolio for {role}
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-6xl leading-tight -tracking-wide mb-3">
              Hi, I'm <span className="text-gradient">{settings.name}</span>.
              <span className="block text-lg sm:text-xl text-white/70 font-semibold mt-2">
                {role} / <span>{text}</span>
                <span className="inline-block w-[10px] h-[1.15em] ml-1.5 translate-y-[3px] rounded-full bg-white/70 animate-[blink_900ms_ease-in-out_infinite]" />
              </span>
            </h1>

            <p className="text-white/70 max-w-[62ch] text-lg leading-relaxed">{settings.bio}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="inline-flex items-center justify-center px-4 py-3 rounded-[16px] border border-white/10 bg-gradient-to-r from-blue-400/95 to-purple-400/80 text-white/95 font-bold shadow-[0_18px_40px_rgba(96,165,250,0.16)] hover:-translate-y-0.5 hover:brightness-105 transition-all">
                View Projects
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-4 py-3 rounded-[16px] border border-white/10 bg-white/5 text-white/90 font-bold hover:bg-white/10 transition-all">
                Contact Me
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-[14px] bg-white/5 border border-white/10 text-white/70 text-sm">
                <span>📍</span> {settings.location}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-[14px] bg-white/5 border border-white/10 text-white/70 text-sm">
                <span>⚡</span> Fast learner, consistent builder
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-[14px] bg-white/5 border border-white/10 text-white/70 text-sm">
                <span>🧠</span> AI + Web
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-4">
            <div className="w-[min(360px,100%)] aspect-square rounded-full p-[10px] bg-[conic-gradient(from_180deg,rgba(96,165,250,0.9),rgba(167,139,250,0.85),rgba(96,165,250,0.9))] shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
              <div className="w-full h-full rounded-full border border-white/10 overflow-hidden bg-[#071225] flex items-center justify-center">
                <img src="/profile.png" alt={settings.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class=\"text-6xl font-bold text-gradient\">' + (settings.name?.charAt(0) || 'M') + '</span>' }} />
              </div>
            </div>
            <div className="relative bottom-0 w-full max-w-[420px] p-4 rounded-[18px] bg-[rgba(10,14,24,0.7)] border border-white/10 backdrop-blur-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <div className="font-bold -tracking-wide">Currently learning</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["React", "Node.js", "Python"].map((t) => (
                  <span key={t} className="inline-flex items-center px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-semibold">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
