import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAnalyticsContext } from "../contexts/AnalyticsContext"

export function useAnalytics() {
  const location = useLocation()
  const { track } = useAnalyticsContext()

  useEffect(() => {
    track(location.pathname)
  }, [location.pathname, track])
}
