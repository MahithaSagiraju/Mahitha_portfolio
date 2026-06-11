import { useState, useEffect, useCallback } from "react"
import { cmsApi } from "../services/cms"

export function useAdminAuth() {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      setLoading(false)
      return
    }
    cmsApi
      .verify()
      .then(() => setIsAuth(true))
      .catch(() => {
        localStorage.removeItem("admin_token")
        setIsAuth(false)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (password: string) => {
    const { token } = await cmsApi.login(password)
    localStorage.setItem("admin_token", token)
    setIsAuth(true)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token")
    setIsAuth(false)
  }, [])

  return { isAuth, loading, login, logout }
}
