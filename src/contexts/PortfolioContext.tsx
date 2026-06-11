import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { cmsApi } from "../services/cms"
import type { Project, Skill, Experience, Certification, PortfolioSettings } from "../types/cms"

interface PortfolioContextType {
  settings: PortfolioSettings | null
  projects: Project[]
  skills: Skill[]
  experiences: Experience[]
  certifications: Certification[]
  loading: boolean
}

const PortfolioContext = createContext<PortfolioContextType>({
  settings: null,
  projects: [],
  skills: [],
  experiences: [],
  certifications: [],
  loading: true,
})

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PortfolioSettings | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      cmsApi.getPublicSettings(),
      cmsApi.getPublicProjects(),
      cmsApi.getPublicSkills(),
      cmsApi.getPublicExperiences(),
      cmsApi.getPublicCertifications(),
    ])
      .then(([s, p, sk, e, c]) => {
        setSettings(s as PortfolioSettings)
        setProjects(p as Project[])
        setSkills(sk as Skill[])
        setExperiences(e as Experience[])
        setCertifications(c as Certification[])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <PortfolioContext.Provider value={{ settings, projects, skills, experiences, certifications, loading }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => useContext(PortfolioContext)
