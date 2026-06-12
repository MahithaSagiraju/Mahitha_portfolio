import Navbar from "../components/public/Navbar"
import Hero from "../components/public/Hero"
import About from "../components/public/About"
import Skills from "../components/public/Skills"
import Education from "../components/public/Education"
import Experience from "../components/public/Experience"
import Projects from "../components/public/Projects"
import Certifications from "../components/public/Certifications"
import Contact from "../components/public/Contact"
import Footer from "../components/public/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}
