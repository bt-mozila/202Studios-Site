import { useRef, useState } from 'react'

const SERVICE_OPTIONS = ['Website Design', 'Electronics Repair', 'Web Hosting', 'Business Automation']

const PACKAGE_OPTIONS = {
  'Website Design': ['Starter Website', 'Business Website', 'E-Commerce Website', 'Custom Build'],
  'Electronics Repair': ['Screen Repair', 'Battery Replacement', 'Board-Level Diagnostics', 'Full Device Refurbish'],
  'Web Hosting': ['Starter Hosting', 'Business Hosting', 'VPS Hosting', 'Managed Hosting'],
  'Business Automation': ['Basic Automation', 'Workflow Integration', 'Custom Automation', 'Full-System Automation'],
}

const PACKAGE_LABELS = {
  'Website Design': 'Website package',
  'Electronics Repair': 'Repair package',
  'Web Hosting': 'Hosting plan',
  'Business Automation': 'Automation package',
}

const EMPTY = { fullName: '', service: SERVICE_OPTIONS[0], email: '', pkg: '', message: '' }

export default function ContactForm({ submitText }) {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const timer = useRef(null)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const onServiceChange = (e) => setForm((f) => ({ ...f, service: e.target.value, pkg: '' }))

  // Block raw HTML in the message (same rule as the original form)
  const onMessageChange = (e) => {
    const el = e.target
    if (/[<>]/.test(el.value)) {
      el.setCustomValidity('HTML code and tags (< >) are not allowed.')
      el.reportValidity()
    } else {
      el.setCustomValidity('')
    }
    setForm((f) => ({ ...f, message: el.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: send `form` to your backend / email service here.
    setSent(true)
    setForm(EMPTY)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setSent(false), 3500)
  }

  const packages = PACKAGE_OPTIONS[form.service] || ['Custom Quote']

  return (
    <form className="cta-form" id="cta-enquiry-form" onSubmit={onSubmit}>
      <div className="cta-form-row">
        <div className="cta-field">
          <label htmlFor="cta-name">Full name</label>
          <input id="cta-name" name="fullName" type="text" placeholder="Your name" required value={form.fullName} onChange={update('fullName')} />
        </div>
        <div className="cta-field">
          <label htmlFor="cta-service">Service needed</label>
          <select id="cta-service" name="service" required value={form.service} onChange={onServiceChange}>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="cta-form-row">
        <div className="cta-field">
          <label htmlFor="cta-email">Email address</label>
          <input id="cta-email" name="email" type="email" placeholder="info@202studios.co.bw" required value={form.email} onChange={update('email')} />
        </div>
        <div className="cta-field">
          <label htmlFor="cta-package">{PACKAGE_LABELS[form.service] || 'Package / plan'}</label>
          <select id="cta-package" name="package" required value={form.pkg} onChange={update('pkg')}>
            <option value="" disabled>Select a package</option>
            {packages.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="cta-field">
        <label htmlFor="cta-message">Project details</label>
        <textarea
          id="cta-message"
          name="message"
          placeholder="Tell us about your project or device issue"
          required
          value={form.message}
          onChange={onMessageChange}
        />
      </div>

      <div className="cta-form-actions">
        <p className={`cta-form-status ${sent ? 'is-visible' : ''}`}>
          {sent ? 'Thanks! We will contact you within one business day.' : ''}
        </p>
        <button className="btn btn-primary" type="submit" disabled={sent}>
          {submitText || 'Send Enquiry'}
        </button>
      </div>
    </form>
  )
}
