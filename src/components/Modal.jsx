import { useEffect } from 'react'

/** Bootstrap-styled modal driven by React state (replaces data-bs-toggle="modal"). */
export default function Modal({ open, id, title, onClose, children }) {
  useEffect(() => {
    if (!open) return undefined
    document.body.classList.add('modal-open')
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div
        className="modal fade show"
        id={id}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}Label`}
        style={{ display: 'block' }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-white" id={`${id}Label`}>{title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body modal-scroll text-white">{children}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}
