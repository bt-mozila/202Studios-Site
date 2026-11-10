import yaml from 'js-yaml'
import siteYaml from './data/site-content.yaml?raw'
import hostingYaml from './data/hosting-packages-content.yaml?raw'
import { slugify } from './lib/utils'

const parsedSite = yaml.load(siteYaml)
const parsedHosting = yaml.load(hostingYaml)

/** All home-page copy lives in src/data/site-content.yaml - edit that file to change text, FAQ, portfolio items, etc. */
export const site = parsedSite.site || parsedSite

/** Hosting page copy lives in src/data/hosting-packages-content.yaml */
export const hosting = parsedHosting.hosting || (parsedHosting.site && parsedHosting.site.hosting) || {}

/** Portfolio items with a stable slug (used for /portfolio/:slug) and a normalised images array. */
export const portfolioItems = (site.portfolio?.items || []).map((item) => ({
  ...item,
  slug: slugify(item.title),
  images: Array.isArray(item.images) && item.images.length ? item.images : item.image ? [item.image] : [],
}))
