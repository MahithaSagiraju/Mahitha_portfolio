import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  animation?: string
  delay?: number
  className?: string
}

export default function ScrollReveal({
  children,
  animation = "fadeInUp 0.7s ease",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    if (!mql) return
    const onChange = () => setReducedMotion(!!mql.matches)
    onChange()
    // Safari fallback
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    }
    mql.addListener(onChange)
    return () => mql.removeListener(onChange)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        animation: visible && !reducedMotion ? `${animation} ${delay}s` : "none",
        willChange: visible ? "transform, opacity" : undefined,
      }}
    >
      {children}
    </div>
  )
}


