import { analyticsApi } from "../../services/analytics"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAdminAuth } from "../../hooks/useAdminAuth"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import type { DashboardStats, Visit, VisitsResponse } from "../../types/analytics"

const COLORS = ["#60a5fa", "#a78bfa", "#34d399", "#f472b6", "#fbbf24", "#fb923c", "#94a3b8"]

export default function AdminDashboard() {
  const { isAuth, logout } = useAdminAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [visits, setVisits] = useState<VisitsResponse | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!isAuth) { navigate("/admin/login"); return }
    analyticsApi.getStats().then(setStats)
    analyticsApi.getVisits(page).then(setVisits)
  }, [isAuth, page, navigate])

  const deleteVisit = async (id: string) => {
    await analyticsApi.deleteVisit(id)
    analyticsApi.getVisits(page).then(setVisits)
    analyticsApi.getStats().then(setStats)
  }

  const exportCsv = async () => {
    const csv = await analyticsApi.exportCsv()
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "visits.csv"; a.click()
    URL.revokeObjectURL(url)
  }

  if (!isAuth) return null

  return (
    <div className="min-h-screen bg-[#050a14]">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-gradient">Analytics Dashboard</h1>
          <div className="flex gap-3">
            <button onClick={exportCsv} className="px-4 py-2 rounded-[14px] border border-white/10 bg-white/5 text-white/80 font-bold text-sm hover:bg-white/10">Export CSV</button>
            <button onClick={() => { logout(); navigate("/admin/login") }} className="px-4 py-2 rounded-[14px] border border-white/10 bg-white/5 text-white/80 font-bold text-sm hover:bg-white/10">Logout</button>
          </div>
        </div>

        {stats && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Visits", value: stats.total },
                { label: "Today", value: stats.today },
                { label: "Pages", value: stats.pages },
                { label: "Countries", value: stats.countriesCount },
              ].map((s) => (
                <div key={s.label} className="glass-card p-5 text-center">
                  <div className="text-3xl font-bold text-gradient">{s.value}</div>
                  <div className="text-white/60 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="glass-card p-5">
                <h2 className="font-bold mb-3">Last 7 Days</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={stats.last7Days}>
                    <XAxis dataKey="date" stroke="#ffffff40" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#ffffff40" tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#071225", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
                    <Bar dataKey="count" fill="#60a5fa" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card p-5">
                <h2 className="font-bold mb-3">Devices</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={stats.devices} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                      {stats.devices.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#071225", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {stats.devices.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-1.5 text-sm text-white/70">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      {d.name} ({d.value})
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5">
                <h2 className="font-bold mb-3">Browsers</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={stats.browsers} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                      {stats.browsers.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#071225", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {stats.browsers.map((b, i) => (
                    <div key={b.name} className="flex items-center gap-1.5 text-sm text-white/70">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      {b.name} ({b.value})
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5">
                <h2 className="font-bold mb-3">Traffic Sources</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={(stats.sources || []).filter((s) => s.name)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                      {(stats.sources || []).filter((s) => s.name).map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#071225", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {(stats.sources || []).filter((s) => s.name).map((s, i) => (
                    <div key={s.name} className="flex items-center gap-1.5 text-sm text-white/70">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      {s.name} ({s.value})
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5">
                <h2 className="font-bold mb-3">Countries</h2>
                <div className="grid gap-1.5 max-h-[200px] overflow-y-auto">
                  {stats.countries.map((c) => (
                    <div key={c.name} className="flex justify-between text-sm text-white/70">
                      <span>{c.name}</span>
                      <span className="font-bold">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="glass-card p-5">
          <h2 className="font-bold mb-4">Recent Visits</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/50 border-b border-white/10">
                  <th className="text-left p-3">Path</th>
                  <th className="text-left p-3">Country</th>
                  <th className="text-left p-3">Browser</th>
                  <th className="text-left p-3">Device</th>
                  <th className="text-left p-3">Referrer</th>
                  <th className="text-left p-3">Time</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {visits?.visits.map((v) => (
                  <tr key={v._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-3 text-white/80">{v.path}</td>
                    <td className="p-3 text-white/80">{v.country}</td>
                    <td className="p-3 text-white/80">{v.browser}</td>
                    <td className="p-3 text-white/80">{v.device}</td>
                    <td className="p-3 text-white/60 max-w-[120px] truncate">{v.referrer}</td>
                    <td className="p-3 text-white/60">{new Date(v.timestamp).toLocaleString()}</td>
                    <td className="p-3">
                      <button onClick={() => deleteVisit(v._id)} className="px-2 py-1 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visits && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-white/60 text-sm">Page {visits.page} of {visits.totalPages} ({visits.total} total)</span>
              <div className="flex gap-2">
                <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 rounded-[14px] border border-white/10 bg-white/5 text-white/80 text-sm disabled:opacity-40">Prev</button>
                <button disabled={page >= (visits.totalPages || 1)} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 rounded-[14px] border border-white/10 bg-white/5 text-white/80 text-sm disabled:opacity-40">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
