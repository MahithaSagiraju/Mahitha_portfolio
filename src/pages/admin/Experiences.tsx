import { cmsApi } from "../../services/cms"
import { useEffect, useState } from "react"
import type { Experience } from "../../types/cms"

const emptyExp = { company: "", role: "", startDate: "", endDate: "", description: [""], order: 1 }

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState<any>(emptyExp)

  useEffect(() => { cmsApi.getExperiences().then(setExperiences) }, [])

  const save = async () => {
    if (editing) {
      const updated = await cmsApi.updateExperience(editing._id, form)
      setExperiences((p) => p.map((x) => (x._id === editing._id ? updated : x)))
    } else {
      const created = await cmsApi.createExperience(form)
      setExperiences((p) => [...p, created])
    }
    setEditing(null); setForm(emptyExp)
  }

  const remove = async (id: string) => {
    await cmsApi.deleteExperience(id)
    setExperiences((p) => p.filter((x) => x._id !== id))
  }

  const startEdit = (e: Experience) => { setEditing(e); setForm({ company: e.company, role: e.role, startDate: e.startDate, endDate: e.endDate, description: e.description, order: e.order }) }

  return (
    <div>
      <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-6">Experiences</h1>
      <div className="glass-card p-5 mb-6">
        <h2 className="text-lg font-bold mb-4">{editing ? "Edit" : "New"} Experience</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="Start Date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="End Date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <textarea placeholder="Description (one per line)" value={form.description.join("\n")} onChange={(e) => setForm({ ...form, description: e.target.value.split("\n") })} className="col-span-2 rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" rows={3} />
          <input placeholder="Order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
        </div>
        <div className="flex gap-2">
          <button onClick={save} className="px-4 py-2.5 rounded-[14px] border border-white/10 bg-gradient-to-r from-blue-400/95 to-purple-400/80 text-white/95 font-bold text-sm hover:-translate-y-0.5 transition-all">{editing ? "Update" : "Create"}</button>
          {editing && <button onClick={() => { setEditing(null); setForm(emptyExp) }} className="px-4 py-2.5 rounded-[14px] border border-white/10 bg-white/5 text-white/80 font-bold text-sm">Cancel</button>}
        </div>
      </div>
      <div className="grid gap-3">
        {experiences.map((e) => (
          <div key={e._id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <div className="font-bold">{e.role} @ {e.company}</div>
              <div className="text-white/60 text-sm">{e.startDate} – {e.endDate}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(e)} className="px-3 py-1.5 rounded-[14px] border border-white/10 bg-white/5 text-white/80 text-sm hover:bg-white/10">Edit</button>
              <button onClick={() => remove(e._id)} className="px-3 py-1.5 rounded-[14px] border border-red-500/20 bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
