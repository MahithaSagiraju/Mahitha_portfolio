export interface AnalyticsPayload {
  path: string
  referrer: string
}

export interface DashboardStats {
  total: number
  today: number
  pages: number
  countriesCount: number
  last7Days: { date: string; count: number }[]
  devices: { name: string; value: number }[]
  browsers: { name: string; value: number }[]
  countries: { name: string; value: number }[]
  sources: { name: string; value: number }[]
}

export interface Visit {
  _id: string
  path: string
  referrer: string
  country: string
  browser: string
  device: string
  os: string
  timestamp: string
}

export interface VisitsResponse {
  visits: Visit[]
  total: number
  page: number
  totalPages: number
}
