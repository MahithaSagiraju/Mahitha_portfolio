export interface Project {
  _id: string
  title: string
  description: string
  category: string
  tags: string[]
  image?: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  order: number
  createdAt: string
}

export interface Skill {
  _id: string
  name: string
  icon: string
  proficiency: number
  category: string
  order: number
}

export interface Experience {
  _id: string
  company: string
  role: string
  startDate: string
  endDate: string
  description: string[]
  order: number
}

export interface Certification {
  _id: string
  title: string
  issuer: string
  date: string
  url?: string
  order: number
}

export interface EducationEntry {
  degree: string
  institution: string
  period: string
  score: string
  description: string
}

export interface AboutHighlight {
  label: string
  value: string
}

export interface PortfolioSettings {
  name: string
  title: string
  bio: string
  location: string
  email: string
  linkedin: string
  github: string
  resumeUrl: string
  avatar: string
  education: EducationEntry[]
  aboutHighlights: AboutHighlight[]
  values: string[]
}

export interface DashboardCounts {
  projects: number
  skills: number
  experiences: number
  certifications: number
  visits: number
}
