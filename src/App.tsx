import { Routes, Route } from "react-router-dom"
import { PortfolioProvider } from "./contexts/PortfolioContext"
import { AnalyticsProvider } from "./contexts/AnalyticsContext"
import { AnalyticsTracker } from "./components/shared/AnalyticsTracker"
import Navbar from "./components/public/Navbar"
import Home from "./pages/Home"
import AdminLayout from "./components/admin/AdminLayout"
import Login from "./pages/admin/Login"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProjects from "./pages/admin/Projects"
import AdminSkills from "./pages/admin/Skills"
import AdminExperiences from "./pages/admin/Experiences"
import AdminCertifications from "./pages/admin/Certifications"
import AdminSettings from "./pages/admin/Settings"
import AnalyticsPage from "./pages/admin-analytics/AdminDashboard"
import NotFound from "./pages/NotFound"

function PublicLayout() {
  return (
    <PortfolioProvider>
      <AnalyticsProvider>
        <AnalyticsTracker />
        <Navbar />
        <Home />
      </AnalyticsProvider>
    </PortfolioProvider>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<PublicLayout />} />
      <Route path="/" element={<PublicLayout />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin-analytics" element={<AnalyticsPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="skills" element={<AdminSkills />} />
        <Route path="experiences" element={<AdminExperiences />} />
        <Route path="certifications" element={<AdminCertifications />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}
