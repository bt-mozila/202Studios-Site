import { useEffect, useMemo, useState } from 'react'
import { site } from '../../content'
import { asset } from '../../lib/utils'

const AUTOPLAY_MS = 5000

export default function Repairs() {
  const repairs = site.repairs || {}
  const cards = repairs.cards || []

  // Same grouping as the original: 3 cards per slide, wrapping round to the start if needed
  const slides = useMemo(() => {
    const out = []
    for (let i = 0; i < cards.length; i += 3) {
      out.push([0, 1, 2].map((j) => cards[(i + j) % cards.length]))
    }
    return out
  }, [cards])

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length

  const go = (dir) => setCurrent((c) => (c + dir + count) % count)

  useEffect(() => {
    if (paused || count < 2) return undefined
    const t = window.setInterval(() => setCurrent((c) => (c + 1) % count), AUTOPLAY_MS)
    return () => window.clearInterval(t)
  }, [paused, count])

  return (
    <section id="repairs" className="repairs">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2 id="repairs-title">{repairs.title}</h2>
          <p id="repairs-description" className="text-white">{repairs.description}</p>
        </div>

        <div
          id="aboutCarousel"
          className="carousel slide"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="carousel-inner" id="about-carousel-inner">
            <div className="rc-track" style={{ transform: `translateX(-${current * 100}%)` }}>
              {slides.map((group, slideIndex) => (
                <div key={slideIndex} className={`carousel-item ${slideIndex === current ? 'active' : ''}`}>
                  <div className="row">
                    {group.map((card, i) => (
                      <div key={`${slideIndex}-${i}`} className="col-12 col-md-4">
                        <div className="card h-100">
                          <img
                            src={asset(card.image)}
                            className="card-img-top card-img-custom"
                            alt={card.title}
                            loading="lazy"
                          />
                          <div className="card-body">
                            <h5 className="card-title text-center">{card.title}</h5>
                            <p className="card-text text-center">{card.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-control-prev" type="button" onClick={() => go(-1)}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" onClick={() => go(1)}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  )
}
