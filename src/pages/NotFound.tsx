import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-6xl font-bold font-['Plus_Jakarta_Sans'] text-gradient mb-4">404</h1>
      <p className="text-white/70 mb-6">Page not found</p>
      <Link to="/" className="px-4 py-3 rounded-[16px] border border-white/10 bg-gradient-to-r from-blue-400/95 to-purple-400/80 text-white/95 font-bold hover:-translate-y-0.5 transition-all">
        Go Home
      </Link>
    </div>
  )
}
