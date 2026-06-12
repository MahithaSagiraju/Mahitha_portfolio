import Hero from "../components/public/Hero"
import About from "../components/public/About"
import Skills from "../components/public/Skills"
import Education from "../components/public/Education"
import Experience from "../components/public/Experience"
import Projects from "../components/public/Projects"
import Certifications from "../components/public/Certifications"
import Contact from "../components/public/Contact"
import Footer from "../components/public/Footer"
import ScrollProgress from "../components/shared/ScrollProgress"
import NavDots from "../components/shared/NavDots"
import BackToTop from "../components/shared/BackToTop"

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <NavDots />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  )
}
