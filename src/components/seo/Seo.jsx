import { useLayoutEffect } from 'react'
import logoImage from '../../assets/Logo.jpeg'
import { SITE_URL } from '../../constants/siteData'

const SITE_NAME = 'MERA Cosmetics'

function htmlLangFromLocale(lang) {
  if (lang === 'en') return 'en'
  if (lang === 'gr') return 'el'
  return 'de'
}

function ogLocaleFromLocale(lang) {
  if (lang === 'en') return 'en_US'
  if (lang === 'gr') return 'el_GR'
  return 'de_CH'
}

function upsertMetaByName(name, content) {
  if (!content) return
  let element = document.querySelector(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertMetaByProperty(property, content) {
  if (!content) return
  let element = document.querySelector(`meta[property="${property}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('property', property)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertCanonical(url) {
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)
}

function upsertJsonLd(data) {
  const id = 'mera-jsonld'
  let script = document.getElementById(id)
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

function clearJsonLd() {
  const script = document.getElementById('mera-jsonld')
  if (script) script.remove()
}

function upsertFavicon(href) {
  let icon = document.querySelector('link[rel="icon"]')
  if (!icon) {
    icon = document.createElement('link')
    icon.setAttribute('rel', 'icon')
    document.head.appendChild(icon)
  }
  icon.setAttribute('type', 'image/jpeg')
  icon.setAttribute('href', href)
}

/** Absolute URL for social previews (Vite resolves `logoImage` to `/assets/...`). */
function absoluteOgImage() {
  const path = typeof logoImage === 'string' ? logoImage : ''
  if (!path) return ''
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Updates document `<head>` for the current route (title, meta, canonical, OG/Twitter, JSON-LD).
 * Uses `useLayoutEffect` so tags are applied before paint. SPA: meta is not in static View Source;
 * use DevTools → Elements → head, or a crawler that runs JS.
 */
function Seo({ title, description, path = '/', keywords = '', structuredData, lang = 'de' }) {
  const jsonLdKey = structuredData ? JSON.stringify(structuredData) : ''

  useLayoutEffect(() => {
    const canonicalUrl =
      path === '/' || path === '' ? `${SITE_URL}/` : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
    const fullTitle = `${title} | ${SITE_NAME}`
    const ogImage = absoluteOgImage()
    const htmlLang = htmlLangFromLocale(lang)

    document.title = fullTitle
    document.documentElement.lang = htmlLang

    upsertMetaByName('description', description)
    upsertMetaByName('keywords', keywords)
    upsertMetaByName('robots', 'index, follow, max-image-preview:large')
    upsertMetaByName('application-name', SITE_NAME)

    upsertMetaByProperty('og:type', 'website')
    upsertMetaByProperty('og:site_name', SITE_NAME)
    upsertMetaByProperty('og:title', fullTitle)
    upsertMetaByProperty('og:description', description)
    upsertMetaByProperty('og:url', canonicalUrl)
    upsertMetaByProperty('og:locale', ogLocaleFromLocale(lang))
    if (ogImage) {
      upsertMetaByProperty('og:image', ogImage)
      upsertMetaByProperty('og:image:secure_url', ogImage)
    }

    upsertMetaByName('twitter:card', 'summary_large_image')
    upsertMetaByName('twitter:title', fullTitle)
    upsertMetaByName('twitter:description', description)
    if (ogImage) upsertMetaByName('twitter:image', ogImage)

    upsertCanonical(canonicalUrl)
    upsertFavicon(logoImage)

    if (structuredData) {
      upsertJsonLd(structuredData)
    } else {
      clearJsonLd()
    }
    /* jsonLdKey = JSON.stringify(structuredData) — avoids redundant effect runs on new object identity */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, keywords, lang, jsonLdKey])

  return null
}

export default Seo
