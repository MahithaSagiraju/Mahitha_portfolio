import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAdminAuth } from "../../hooks/useAdminAuth"

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/experiences", label: "Experiences" },
  { to: "/admin/certifications", label: "Certifications" },
  { to: "/admin/settings", label: "Settings" },
]

export default function AdminLayout() {
  const { isAuth, logout } = useAdminAuth()
  const navigate = useNavigate()

  if (!isAuth) {
    navigate("/admin/login")
    return null
  }

  return (
    <div className="min-h-screen bg-[#050a14] flex">
      <aside className="w-64 glass border-r border-white/10 p-4 flex flex-col gap-2">
        <div className="text-xl font-bold font-['Plus_Jakarta_Sans'] mb-6 text-gradient">Admin</div>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl transition-all ${isActive ? "bg-blue-500/20 text-blue-300 border border-blue-500/20" : "text-white/70 hover:bg-white/5"}`
            }
          >
            {l.label}
          </NavLink>
        ))}
        <NavLink
          to="/admin-analytics"
          className={({ isActive }) =>
            `block px-4 py-2.5 rounded-xl transition-all ${isActive ? "bg-blue-500/20 text-blue-300 border border-blue-500/20" : "text-white/70 hover:bg-white/5"}`
          }
        >
          Analytics
        </NavLink>
        <div className="flex-1" />
        <button onClick={() => { logout(); navigate("/admin/login") }} className="px-4 py-2.5 rounded-xl text-white/50 hover:bg-white/5 transition-all text-left">
          Logout
        </button>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
