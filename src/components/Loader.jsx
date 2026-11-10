import { useEffect, useState } from 'react'

/** The spinner shown until the page has finished loading (same as the old loader-6). */
export default function Loader() {
  const [hidden, setHidden] = useState(document.readyState === 'complete')

  useEffect(() => {
    if (hidden) return undefined
    const hide = () => setHidden(true)
    window.addEventListener('load', hide)
    const safety = window.setTimeout(hide, 4000) // never leave the spinner stuck
    return () => {
      window.removeEventListener('load', hide)
      window.clearTimeout(safety)
    }
  }, [hidden])

  if (hidden) return null
  return (
    <div className="loader-6 center">
      <span></span>
    </div>
  )
}
