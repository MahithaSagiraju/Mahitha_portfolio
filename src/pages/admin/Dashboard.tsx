import { cmsApi } from "../../services/cms"
import { useEffect, useState } from "react"
import type { DashboardCounts } from "../../types/cms"

export default function Dashboard() {
  const [data, setData] = useState<DashboardCounts | null>(null)

  useEffect(() => {
    cmsApi.getDashboard().then(setData).catch(console.error)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data && Object.entries(data).map(([key, val]) => (
          <div key={key} className="glass-card p-5 text-center">
            <div className="text-3xl font-bold text-gradient">{val}</div>
            <div className="text-white/60 mt-1 capitalize">{key}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
