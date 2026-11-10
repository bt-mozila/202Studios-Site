import { useState } from 'react'
import { site } from '../../content'

export default function Faq() {
  const faq = site.faq || {}
  const items = faq.items || []
  const [open, setOpen] = useState(null) // one item open at a time (same as data-bs-parent)

  return (
    <section id="why-us" className="why-us">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-12 content">
            <h3 id="faq-title">{faq.title}</h3>

            <div id="faq-list" className="accordion-list">
              <ul>
                {items.map((item, index) => {
                  const isOpen = open === index
                  return (
                    <li key={item.question}>
                      <a
                        href={`#faq-item-${index}`}
                        className={isOpen ? '' : 'collapsed'}
                        aria-expanded={isOpen}
                        onClick={(e) => {
                          e.preventDefault()
                          setOpen(isOpen ? null : index)
                        }}
                      >
                        {item.question} <i className="bx bx-chevron-down icon-show"></i>
                      </a>
                      <div id={`faq-item-${index}`} className={`collapse ${isOpen ? 'show' : ''}`}>
                        <p>{item.answer}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
