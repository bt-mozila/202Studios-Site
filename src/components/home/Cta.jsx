import AnchorLink from '../AnchorLink.jsx'
import ContactForm from './ContactForm.jsx'
import { site } from '../../content'

export default function Cta() {
  const cta = site.cta || {}
  const contact = site.contact || {}

  return (
    <section id="contact" className="cta-section">
      <div className="container">
        <div className="cta-banner" data-aos="fade-up">
          <div className="cta-copy">
            <p id="cta-kicker" className="cta-kicker">{cta.kicker}</p>
            <h3 id="cta-heading">{cta.heading}</h3>
          </div>
          <div className="cta-actions">
            <AnchorLink id="contact" className="btn btn-primary btn-lg">{cta.primaryCta}</AnchorLink>
            <AnchorLink id="portfolio" className="btn btn-outline-light btn-lg">{cta.secondaryCta}</AnchorLink>
          </div>
        </div>

        <div id="cta-form-root" className="cta-form-root" data-aos="fade-up" data-aos-delay="100">
          <ContactForm submitText={contact.submitText} />
        </div>
      </div>
    </section>
  )
}
