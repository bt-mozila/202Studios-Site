import { useEffect, useState } from 'react'
import { asset } from '../lib/utils'

/** Looping, auto-playing image slider with clickable bullets (React replacement for the old Swiper setup). */
export default function ImageSlider({ images, interval = 5000 }) {
  const [current, setCurrent] = useState(0)
  const count = images.length

  useEffect(() => {
    setCurrent(0)
  }, [images])

  useEffect(() => {
    if (count < 2) return undefined
    const t = window.setInterval(() => setCurrent((c) => (c + 1) % count), interval)
    return () => window.clearInterval(t)
  }, [count, interval])

  return (
    <div className="portfolio-details-slider swiper">
      <div
        className="swiper-wrapper align-items-center"
        style={{ transform: `translate3d(-${current * 100}%, 0, 0)` }}
      >
        {images.map((src, index) => (
          <div className="swiper-slide" key={`${src}-${index}`}>
            <img src={asset(src)} alt={`Project Image ${index + 1}`} className="img-fluid" />
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
          {images.map((src, index) => (
            <span
              key={`${src}-bullet-${index}`}
              className={`swiper-pagination-bullet ${index === current ? 'swiper-pagination-bullet-active' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrent(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setCurrent(index)
              }}
            ></span>
          ))}
        </div>
      )}
    </div>
  )
}
