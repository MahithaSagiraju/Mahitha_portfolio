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

export const analyticsApi = {
  track: (path: string, referrer: string) =>
    request("/api/analytics", {
      method: "POST",
      body: JSON.stringify({ path, referrer }),
    }).catch(() => {}),
  login: (password: string) =>
    request("/api/admin/login", { method: "POST", body: JSON.stringify({ password }) }),
  getStats: () => request("/api/admin/stats"),
  getVisits: (page = 1, limit = 20) =>
    request(`/api/admin/visits?page=${page}&limit=${limit}`),
  deleteVisit: (id: string) =>
    request(`/api/admin/visits/${id}`, { method: "DELETE" }),
  exportCsv: () => {
    const token = localStorage.getItem("admin_token")
    return fetch(`${API}/api/admin/export`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.text())
  },
}
