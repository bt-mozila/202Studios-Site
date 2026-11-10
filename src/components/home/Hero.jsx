import { useEffect, useState } from 'react'
import AnchorLink from '../AnchorLink.jsx'
import { site } from '../../content'
import { asset } from '../../lib/utils'

const HERO_IMAGES = [
  'assets/img/Hero Section/programming-code-pc.webp',
  'assets/img/Hero Section/micro-soldering.webp',
  'assets/img/Hero Section/automation2.webp',
]
const INTERVAL = 5000

export default function Hero() {
  const hero = site.hero || {}
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = window.setInterval(() => setIndex((i) => (i + 1) % HERO_IMAGES.length), INTERVAL)
    return () => window.clearInterval(t)
  }, [])

  return (
    <section id="hero" className="d-flex justify-content-center align-items-center">
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`bg-slide ${i === index ? 'active' : ''}`}
          style={{ backgroundImage: `url("${asset(src)}")` }}
        />
      ))}

      <div className="container hero-content">
        <div className="hero-glass text-center">
          <h2 id="hero-title" className="animate__animated animate__fadeInDown">{hero.title}</h2>
          <p id="hero-description" className="animate__animated animate__fadeInUp">{hero.description}</p>
          <div className="hero-ctas d-flex justify-content-center gap-2 mt-3">
            <AnchorLink id="aboutUs" className="btn btn-primary btn-lg">{hero.primaryCta}</AnchorLink>
            <AnchorLink id="portfolio" className="btn btn-outline-light btn-lg">{hero.secondaryCta}</AnchorLink>
          </div>
        </div>
      </div>
    </section>
  )
}
