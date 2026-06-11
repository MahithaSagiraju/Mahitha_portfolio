import { cmsApi } from "../../services/cms"
import { useEffect, useState } from "react"
import type { Skill } from "../../types/cms"

const emptySkill = { name: "", icon: "", proficiency: 50, category: "", order: 1 }

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState<any>(emptySkill)

  useEffect(() => { cmsApi.getSkills().then(setSkills) }, [])

  const save = async () => {
    if (editing) {
      const updated = await cmsApi.updateSkill(editing._id, form)
      setSkills((p) => p.map((x) => (x._id === editing._id ? updated : x)))
    } else {
      const created = await cmsApi.createSkill(form)
      setSkills((p) => [...p, created])
    }
    setEditing(null); setForm(emptySkill)
  }

  const remove = async (id: string) => {
    await cmsApi.deleteSkill(id)
    setSkills((p) => p.filter((x) => x._id !== id))
  }

  const startEdit = (s: Skill) => { setEditing(s); setForm({ name: s.name, icon: s.icon, proficiency: s.proficiency, category: s.category, order: s.order }) }

  return (
    <div>
      <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-6">Skills</h1>
      <div className="glass-card p-5 mb-6">
        <h2 className="text-lg font-bold mb-4">{editing ? "Edit" : "New"} Skill</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="Icon (emoji)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-sm">Proficiency: {form.proficiency}%</span>
            <input type="range" min={0} max={100} value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: parseInt(e.target.value) })} className="flex-1" />
          </div>
          <input placeholder="Order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
        </div>
        <div className="flex gap-2">
          <button onClick={save} className="px-4 py-2.5 rounded-[14px] border border-white/10 bg-gradient-to-r from-blue-400/95 to-purple-400/80 text-white/95 font-bold text-sm hover:-translate-y-0.5 transition-all">{editing ? "Update" : "Create"}</button>
          {editing && <button onClick={() => { setEditing(null); setForm(emptySkill) }} className="px-4 py-2.5 rounded-[14px] border border-white/10 bg-white/5 text-white/80 font-bold text-sm">Cancel</button>}
        </div>
      </div>
      <div className="grid gap-3">
        {skills.map((s) => (
          <div key={s._id} className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="font-bold">{s.name}</div>
                <div className="text-white/60 text-sm">{s.category} • {s.proficiency}%</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(s)} className="px-3 py-1.5 rounded-[14px] border border-white/10 bg-white/5 text-white/80 text-sm hover:bg-white/10">Edit</button>
              <button onClick={() => remove(s._id)} className="px-3 py-1.5 rounded-[14px] border border-red-500/20 bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
