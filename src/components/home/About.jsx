import { site } from '../../content'
import { asset } from '../../lib/utils'

const ABOUT_IMAGES = [
  { src: 'assets/img/About Us Section/data-recovery.png', alt: 'Mobile phone illustration' },
  { src: 'assets/img/About Us Section/web-dev.png', alt: 'Electronics repair example' },
  { src: 'assets/img/About Us Section/hinge-repair2.png', alt: 'hinge-repair' },
  { src: 'assets/img/About Us Section/tech-support.png', alt: 'Device repair example' },
]

export default function About() {
  const about = site.about || {}
  return (
    <section id="aboutUs" className="about">
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center">
          <h2 id="about-title">{about.title}</h2>
          <p id="about-description" className="text-white">{about.description}</p>
        </div>

        <div className="row mb-5 g-3">
          {ABOUT_IMAGES.map((img) => (
            <div key={img.src} className="col-6 col-md-3 d-flex align-items-stretch">
              <img src={asset(img.src)} className="img-fluid mb-3" alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
