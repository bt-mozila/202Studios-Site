import { Link } from 'react-router-dom'
import AnchorLink from '../AnchorLink.jsx'
import { site } from '../../content'

/** YAML links look like "#contact" (home-page section) - "#hosting" now goes to the real hosting page. */
function ServiceLink({ link, className, children }) {
  if (!link || !link.startsWith('#')) {
    return <a href={link} className={className}>{children}</a>
  }
  const id = link.slice(1)
  if (id === 'hosting') {
    return <Link to="/hosting-packages" className={className}>{children}</Link>
  }
  return <AnchorLink id={id} className={className}>{children}</AnchorLink>
}

export default function Services() {
  const services = site.services || {}
  const items = services.items || []

  return (
    <section id="services" className="services">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2 id="services-title">{services.title}</h2>
          <p id="services-description" className="text-white">{services.description}</p>
        </div>

        <div id="services-grid" className="row">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`col-md-6 d-flex align-items-stretch ${index > 1 ? 'mt-4 mt-lg-4' : ''}`}
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <div className="icon-box d-flex flex-column justify-content-between">
                <div>
                  <i className={`bi ${item.icon}`}></i>
                  <h4><ServiceLink link={item.link}>{item.title}</ServiceLink></h4>
                  <p>{item.description}</p>
                  <div className="mt-3 service-cta">
                    <ServiceLink link={item.link} className="btn btn-primary">
                      {item.button || 'Learn More'}
                    </ServiceLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
