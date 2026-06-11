export default function Footer() {
  return (
    <footer className="py-6 border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4" style={{ maxWidth: "var(--container, 1100px)" }}>
        <p className="text-white/70 text-sm">© {new Date().getFullYear()} Sagiraju Mahitha. All rights reserved.</p>
        <a href="#home" className="text-sm text-white/70 px-3 py-1.5 rounded-[14px] border border-white/10 bg-white/5 hover:-translate-y-0.5 hover:bg-white/10 transition-all">Back to top</a>
      </div>
    </footer>
  )
}
