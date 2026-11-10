import { hosting } from '../content'
import { asset } from '../lib/utils'

const FALLBACK_IMAGE = 'assets/img/cta-bg.jpg'

function PackageCard({ pkg }) {
  const price = pkg.price != null ? `${pkg.currency || ''} ${pkg.price}/${pkg.interval || 'mo'}` : ''
  const image = [pkg.image, pkg.img, pkg.thumbnail, 'assets/img/portfolio/Websites/smocho/smocho1.webp'].find(Boolean)

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card pricing-card h-100">
        <img
          src={asset(image)}
          className="card-img-top"
          alt={pkg.name}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = asset(FALLBACK_IMAGE)
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-white">{pkg.name}</h5>
          <p className="text-white-50">{pkg.description || ''}</p>
          <h6 className="text-white mt-auto">{price}</h6>
          <ul className="text-white-50 mt-2">
            {(pkg.features || []).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <a className="btn btn-primary mt-3 align-self-start" href={pkg.contact || '#'}>
            {pkg.cta || 'Contact'}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Hosting() {
  const packages = hosting.packages || []

  return (
    <section className="hosting-section">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2 id="hosting-title">{hosting.title || 'Hosting Packages'}</h2>
          <p id="hosting-description" className="text-white">
            {hosting.description || 'Reliable hosting plans tailored for businesses of all sizes.'}
          </p>
        </div>

        <div className="row" id="packages-container">
          {packages.length ? (
            packages.map((pkg) => <PackageCard key={pkg.id || pkg.name} pkg={pkg} />)
          ) : (
            <p className="text-white-50">No hosting packages available.</p>
          )}
        </div>
      </div>
    </section>
  )
}
