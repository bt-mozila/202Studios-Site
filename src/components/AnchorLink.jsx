import { useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL, scrollToId } from '../lib/utils'

/**
 * Link to a section of the home page (e.g. #services).
 * On the home page it smooth-scrolls with the header offset; from any other page it navigates home first.
 */
export default function AnchorLink({ id, onNavigate, children, ...rest }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    if (onNavigate) onNavigate()
    if (location.pathname === '/') {
      scrollToId(id)
      window.history.replaceState(null, '', `${BASE_URL}#${id}`)
    } else {
      navigate({ pathname: '/', hash: `#${id}` })
    }
  }

  return (
    <a href={`${BASE_URL}#${id}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
