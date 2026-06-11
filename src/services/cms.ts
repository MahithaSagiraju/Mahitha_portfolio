const API = import.meta.env.VITE_API_URL || ""

async function request(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("admin_token")
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }
  if (token) headers["Authorization"] = `Bearer ${token}`
  const res = await fetch(`${API}${url}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || "Request failed")
  }
  return res.json()
}

export const cmsApi = {
  login: (password: string) =>
    request("/api/cms/login", { method: "POST", body: JSON.stringify({ password }) }),
  verify: () => request("/api/cms/verify"),
  getDashboard: () => request("/api/cms/dashboard"),
  getProjects: () => request("/api/cms/projects"),
  getPublicProjects: () => request("/api/projects"),
  createProject: (data: any) =>
    request("/api/cms/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id: string, data: any) =>
    request(`/api/cms/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id: string) =>
    request(`/api/cms/projects/${id}`, { method: "DELETE" }),
  getSkills: () => request("/api/cms/skills"),
  getPublicSkills: () => request("/api/skills"),
  createSkill: (data: any) =>
    request("/api/cms/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill: (id: string, data: any) =>
    request(`/api/cms/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSkill: (id: string) =>
    request(`/api/cms/skills/${id}`, { method: "DELETE" }),
  getExperiences: () => request("/api/cms/experiences"),
  getPublicExperiences: () => request("/api/experiences"),
  createExperience: (data: any) =>
    request("/api/cms/experiences", { method: "POST", body: JSON.stringify(data) }),
  updateExperience: (id: string, data: any) =>
    request(`/api/cms/experiences/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteExperience: (id: string) =>
    request(`/api/cms/experiences/${id}`, { method: "DELETE" }),
  getCertifications: () => request("/api/cms/certifications"),
  getPublicCertifications: () => request("/api/certifications"),
  createCertification: (data: any) =>
    request("/api/cms/certifications", { method: "POST", body: JSON.stringify(data) }),
  updateCertification: (id: string, data: any) =>
    request(`/api/cms/certifications/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCertification: (id: string) =>
    request(`/api/cms/certifications/${id}`, { method: "DELETE" }),
  getSettings: () => request("/api/cms/settings"),
  getPublicSettings: () => request("/api/settings/public"),
  updateSettings: (data: any) =>
    request("/api/cms/settings", { method: "PUT", body: JSON.stringify(data) }),
  upload: (image: string) =>
    request("/api/cms/upload", { method: "POST", body: JSON.stringify({ image }) }),
}
