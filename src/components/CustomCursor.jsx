import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ref = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return
      ref.current.style.left = e.clientX + 'px'
      ref.current.style.top = e.clientY + 'px'
    }
    document.addEventListener('mousemove', move)
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return <div className="custom-cursor" id="custom-cursor" ref={ref}></div>
}
