import { useEffect, useState, useRef } from "react"

export default function AnimatedCounter({ value, suffix = "" }: { value: string | number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const numValue = typeof value === "string" ? parseInt(value) || 0 : value

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 1200
    const step = Math.ceil(numValue / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= numValue) { setCount(numValue); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [visible, numValue])

  if (typeof value === "string" && isNaN(parseInt(value))) {
    return <div ref={ref} className="font-extrabold text-lg -tracking-wide text-gradient">{value}</div>
  }

  return <div ref={ref} className="font-extrabold text-lg -tracking-wide text-gradient">{count}{suffix}</div>
}
