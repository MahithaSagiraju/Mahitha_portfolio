import { cmsApi } from "../../services/cms"
import { useEffect, useState } from "react"
import type { Certification } from "../../types/cms"

const emptyCert = { title: "", issuer: "", date: "", url: "", order: 1 }

export default function AdminCertifications() {
  const [certs, setCerts] = useState<Certification[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState<any>(emptyCert)

  useEffect(() => { cmsApi.getCertifications().then(setCerts) }, [])

  const save = async () => {
    if (editing) {
      const updated = await cmsApi.updateCertification(editing._id, form)
      setCerts((p) => p.map((x) => (x._id === editing._id ? updated : x)))
    } else {
      const created = await cmsApi.createCertification(form)
      setCerts((p) => [...p, created])
    }
    setEditing(null); setForm(emptyCert)
  }

  const remove = async (id: string) => {
    await cmsApi.deleteCertification(id)
    setCerts((p) => p.filter((x) => x._id !== id))
  }

  const startEdit = (c: Certification) => { setEditing(c); setForm({ title: c.title, issuer: c.issuer, date: c.date, url: c.url || "", order: c.order }) }

  return (
    <div>
      <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-6">Certifications</h1>
      <div className="glass-card p-5 mb-6">
        <h2 className="text-lg font-bold mb-4">{editing ? "Edit" : "New"} Certification</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="Issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="Order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
        </div>
        <div className="flex gap-2">
          <button onClick={save} className="px-4 py-2.5 rounded-[14px] border border-white/10 bg-gradient-to-r from-blue-400/95 to-purple-400/80 text-white/95 font-bold text-sm hover:-translate-y-0.5 transition-all">{editing ? "Update" : "Create"}</button>
          {editing && <button onClick={() => { setEditing(null); setForm(emptyCert) }} className="px-4 py-2.5 rounded-[14px] border border-white/10 bg-white/5 text-white/80 font-bold text-sm">Cancel</button>}
        </div>
      </div>
      <div className="grid gap-3">
        {certs.map((c) => (
          <div key={c._id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <div className="font-bold">{c.title}</div>
              <div className="text-white/60 text-sm">{c.issuer}{c.date ? ` • ${c.date}` : ""}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(c)} className="px-3 py-1.5 rounded-[14px] border border-white/10 bg-white/5 text-white/80 text-sm hover:bg-white/10">Edit</button>
              <button onClick={() => remove(c._id)} className="px-3 py-1.5 rounded-[14px] border border-red-500/20 bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
