import { cmsApi } from "../../services/cms"
import { useEffect, useState } from "react"
import type { Project } from "../../types/cms"

const emptyProject = { title: "", description: "", category: "", tags: [], liveUrl: "", githubUrl: "", featured: false, order: 1 }

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState<any>(emptyProject)

  useEffect(() => {
    cmsApi.getProjects().then(setProjects)
  }, [])

  const save = async () => {
    if (editing) {
      const updated = await cmsApi.updateProject(editing._id, form)
      setProjects((p) => p.map((x) => (x._id === editing._id ? updated : x)))
    } else {
      const created = await cmsApi.createProject(form)
      setProjects((p) => [...p, created])
    }
    setEditing(null)
    setForm(emptyProject)
  }

  const remove = async (id: string) => {
    await cmsApi.deleteProject(id)
    setProjects((p) => p.filter((x) => x._id !== id))
  }

  const startEdit = (p: Project) => {
    setEditing(p)
    setForm({ title: p.title, description: p.description, category: p.category, tags: p.tags, liveUrl: p.liveUrl || "", githubUrl: p.githubUrl || "", featured: p.featured || false, order: p.order })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-6">Projects</h1>
      <div className="glass-card p-5 mb-6">
        <h2 className="text-lg font-bold mb-4">{editing ? "Edit" : "New"} Project</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="col-span-2 rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="col-span-2 rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" rows={3} />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="Tags (comma separated)" value={form.tags.join(", ")} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((s: string) => s.trim()) })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="Live URL" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="GitHub URL" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <input placeholder="Order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })} className="rounded-[16px] border border-white/10 bg-black/20 text-white/90 p-3 outline-none focus:border-purple-500/50" />
          <label className="flex items-center gap-2 text-white/70">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured
          </label>
        </div>
        <div className="flex gap-2">
          <button onClick={save} className="px-4 py-2.5 rounded-[14px] border border-white/10 bg-gradient-to-r from-blue-400/95 to-purple-400/80 text-white/95 font-bold text-sm hover:-translate-y-0.5 transition-all">{editing ? "Update" : "Create"}</button>
          {editing && <button onClick={() => { setEditing(null); setForm(emptyProject) }} className="px-4 py-2.5 rounded-[14px] border border-white/10 bg-white/5 text-white/80 font-bold text-sm">Cancel</button>}
        </div>
      </div>
      <div className="grid gap-3">
        {projects.map((p) => (
          <div key={p._id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <div className="font-bold">{p.title}</div>
              <div className="text-white/60 text-sm">{p.category} • {p.tags?.join(", ")}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="px-3 py-1.5 rounded-[14px] border border-white/10 bg-white/5 text-white/80 text-sm hover:bg-white/10">Edit</button>
              <button onClick={() => remove(p._id)} className="px-3 py-1.5 rounded-[14px] border border-red-500/20 bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
