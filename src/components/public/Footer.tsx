import ScrollReveal from "../shared/ScrollReveal"

export default function Footer() {
  return (
    <ScrollReveal>
      <footer className="py-8 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ maxWidth: "var(--container, 1100px)" }}>
          <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Sagiraju Mahitha. Built with passion.</p>
          <a href="#home" className="text-sm text-white/40 px-4 py-2 rounded-[12px] border border-white/10 bg-white/5 hover:-translate-y-1 hover:bg-white/10 hover:text-white/70 hover:border-blue-400/20 transition-all duration-300 inline-flex items-center gap-2">
            Back to top
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
          </a>
        </div>
      </footer>
    </ScrollReveal>
  )
}
