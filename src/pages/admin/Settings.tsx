import { cmsApi } from "../../services/cms"
import { useEffect, useState } from "react"

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, any>>({})

  useEffect(() => {
    cmsApi.getSettings().then(setSettings)
  }, [])

  const update = (key: string, value: any) => {
    setSettings((s) => ({ ...s, [key]: value }))
  }

  const save = async () => {
    await cmsApi.updateSettings(settings)
    alert("Settings saved")
  }

  if (!Object.keys(settings).length) return <div>Loading...</div>

  const fields = ["name", "title", "bio", "location", "email", "linkedin", "github", "resumeUrl"]

  return (
    <div>
      <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-6">Settings</h1>
      <div className="glass-card p-5 max-w-2xl">
        <div className="grid gap-4">
          {fields.map((key) => (
            <div key={key} className="grid gap-1">
              <label className="font-bold text-white/70 capitalize">{key}</label>
              {key === "bio" ? (
                <textarea value={settings[key] || ""} onChange={(e) => update(key, e.target.value)} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" rows={3} />
              ) : (
                <input value={settings[key] || ""} onChange={(e) => update(key, e.target.value)} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
              )}
            </div>
          ))}
          <button onClick={save} className="px-4 py-2.5 rounded-[14px] border border-white/10 bg-gradient-to-r from-blue-400/95 to-purple-400/80 text-white/95 font-bold text-sm hover:-translate-y-0.5 transition-all w-fit">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
