import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { analyticsApi } from "../services/analytics"

interface AnalyticsContextType {
  track: (path: string) => void
}

const AnalyticsContext = createContext<AnalyticsContextType>({ track: () => {} })

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const track = (path: string) => {
    analyticsApi.track(path, document.referrer || "direct")
  }

  return (
    <AnalyticsContext.Provider value={{ track }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalyticsContext = () => useContext(AnalyticsContext)
