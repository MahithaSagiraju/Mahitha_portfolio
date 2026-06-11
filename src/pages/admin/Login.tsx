import { useNavigate } from "react-router-dom"
import { useAdminAuth } from "../../hooks/useAdminAuth"
import { useState } from "react"

export default function Login() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAdminAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(password)
      navigate("/admin")
    } catch {
      setError("Invalid password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a14]">
      <form onSubmit={handleSubmit} className="glass-card p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-6 text-gradient">Admin Login</h1>
        {error && <p className="text-red-400 mb-3">{error}</p>}
        <div className="grid gap-2 mb-4">
          <label className="font-bold text-white/80">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
        </div>
        <button type="submit" className="w-full px-4 py-3 rounded-[16px] border border-white/10 bg-gradient-to-r from-blue-400/95 to-purple-400/80 text-white/95 font-bold shadow-[0_18px_40px_rgba(96,165,250,0.16)] hover:-translate-y-0.5 transition-all">
          Login
        </button>
      </form>
    </div>
  )
}
