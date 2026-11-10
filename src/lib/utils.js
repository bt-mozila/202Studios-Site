const BASE = import.meta.env.BASE_URL || '/'

/** Turn a relative asset path from the YAML/data files into a URL that works on every route. */
export function asset(path) {
  if (!path) return ''
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return BASE + path.replace(/^\/+/, '')
}

/** URL-friendly slug used for /portfolio/:slug */
export function slugify(text = '') {
  return String(text)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Smooth-scroll to a section id, leaving room for the fixed header (same behaviour as the old main.js). */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return false
  const header = document.getElementById('header')
  const offset = header ? header.offsetHeight : 0
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
  return true
}

export const BASE_URL = BASE
