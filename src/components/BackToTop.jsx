import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#"
      className={`back-to-top d-flex align-items-center justify-content-center ${active ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      aria-label="Back to top"
    >
      <i className="bi bi-arrow-up-short"></i>
    </a>
  )
}
