import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { site, portfolioItems } from '../../content'
import { asset } from '../../lib/utils'

export default function Portfolio() {
  const portfolio = site.portfolio || {}
  const filters = portfolio.filters || []
  const [active, setActive] = useState('*')
  const navigate = useNavigate()

  const visible = portfolioItems.filter((item) => active === '*' || item.filterCategory === active)

  return (
    <section id="portfolio" className="portfolio">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2 id="portfolio-title">{portfolio.title}</h2>
          <p id="portfolio-description" className="text-white">{portfolio.description}</p>
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <ul id="portfolio-filters" className="d-flex justify-content-center gap-2">
              {filters.map((filter) => (
                <li
                  key={filter.value}
                  data-filter={filter.value}
                  className={`btn btn-outline-primary ${active === filter.value ? 'filter-active' : ''}`}
                  onClick={() => setActive(filter.value)}
                >
                  {filter.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row portfolio-container" id="portfolio-container">
          {visible.map((item) => {
            const open = () => navigate(`/portfolio/${item.slug}`)
            const filterClass = item.filterCategory ? item.filterCategory.substring(1) : 'filter-website'
            return (
              <div key={item.slug} className={`col-lg-4 col-md-6 portfolio-item ${filterClass}`} data-filter={item.filterCategory}>
                <div className="portfolio-wrap">
                  <div
                    className="card clickable"
                    role="button"
                    tabIndex={0}
                    aria-label={item.title}
                    onClick={open}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        open()
                      }
                    }}
                  >
                    <div className="card-img">
                      <img className="img-fluid" src={asset(item.image)} alt={item.title} loading="lazy" />
                      <span className="category-badge">{(item.category || '').toUpperCase()}</span>
                    </div>
                    <div className="card-body position-relative">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{item.title}</h5>
                        <div className="portfolio-links">
                          <i className="bi bi-eye"></i>
                        </div>
                      </div>
                      <p className="card-text">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
