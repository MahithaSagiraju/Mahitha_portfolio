export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-black/25">
      <div className="container mx-auto px-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" style={{ maxWidth: "var(--container, 1100px)" }}>
        <div>
          <p className="text-white/80 font-semibold">Built for growth-focused teams.</p>
          <p className="text-white/60 text-sm mt-1">© {new Date().getFullYear()} Sagiraju Mahitha. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="#home" className="text-sm text-white/70 px-3 py-1.5 rounded-[14px] border border-white/10 bg-white/5 hover:-translate-y-0.5 hover:bg-white/10 transition-all">Back to top</a>
          <a href="#contact" className="text-sm text-white/90 px-3 py-1.5 rounded-[14px] border border-blue-400/20 bg-blue-500/10 hover:bg-blue-500/20 transition-all">Get in touch</a>
        </div>
      </div>
    </footer>
  )
}
