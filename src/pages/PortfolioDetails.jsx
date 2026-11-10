import { Link, Navigate, useParams } from 'react-router-dom'
import ImageSlider from '../components/ImageSlider.jsx'
import { portfolioItems } from '../content'

function formatDate(value) {
  if (!value) return 'Not specified'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function PortfolioDetails() {
  const { slug } = useParams()
  const item = portfolioItems.find((p) => p.slug === slug)

  // unknown project -> back to the portfolio section (same as the old "no item selected" redirect)
  if (!item) return <Navigate to={{ pathname: '/', hash: '#portfolio' }} replace />

  const client = item.client || '202Studios'

  return (
    <main id="main">
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Portfolio Details</li>
          </ol>
          <h2>Portfolio Details</h2>
        </div>
      </section>

      <section id="portfolio-details" className="portfolio-details">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-8">
              <ImageSlider images={item.images} />
            </div>

            <div className="col-lg-4">
              <div className="portfolio-info">
                <h3 className="text-white">Project information</h3>
                <ul className="text-white">
                  <li><strong>Category</strong>: {item.category || 'Uncategorized'}</li>
                  <li><strong>Client</strong>: {client}</li>
                  <li><strong>Project date</strong>: {formatDate(item.date)}</li>
                  {item.url && (
                    <li>
                      <strong>Project URL</strong>:{' '}
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-underline">
                        {item.url}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <div className="portfolio-description">
                <h2 className="text-white mb-3">{item.title}</h2>
                <p className="text-white">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
