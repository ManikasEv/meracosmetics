import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks, socialLinks } from '../../constants/siteData'
import { Link, NavLink } from 'react-router-dom'
import { createTranslator } from '../../i18n/textTable'

gsap.registerPlugin(ScrollTrigger)

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.88-3.15 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 1 0 15.82 15V8.67a8.16 8.16 0 0 0 4.77 1.52Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M13.6 22v-8.2h2.76l.42-3.2H13.6V8.55c0-.93.26-1.56 1.6-1.56h1.7V4.13A22 22 0 0 0 14.42 4c-2.45 0-4.13 1.49-4.13 4.22v2.35H7.5v3.2h2.79V22h3.31Z" />
    </svg>
  )
}

function getSocialIcon(label) {
  if (label === 'Instagram') return <InstagramIcon />
  if (label === 'TikTok') return <TikTokIcon />
  if (label === 'Facebook') return <FacebookIcon />
  return null
}

function Footer({ language }) {
  const t = createTranslator(language)
  const footerRef = useRef(null)

  useLayoutEffect(() => {
    const root = footerRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const blocks = root.querySelectorAll('[data-footer-reveal]')
      if (!blocks.length) return

      gsap.fromTo(
        blocks,
        { y: 28 },
        {
          y: 0,
          duration: 0.78,
          stagger: 0.09,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: 'top 92%',
            once: true,
            invalidateOnRefresh: true,
          },
        },
      )
    }, root)

    const refresh = () => {
      ScrollTrigger.refresh()
    }
    requestAnimationFrame(refresh)
    window.addEventListener('load', refresh)
    window.addEventListener('resize', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', refresh)
      ctx.revert()
    }
  }, [language])

  return (
    <footer
      ref={footerRef}
      id="kontakt"
      className="border-t border-[#4A3F35]/10 bg-[#FAF7F2] relative overflow-x-hidden pt-20 pb-10"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#8B7355]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 mb-20">
          <div data-footer-reveal className="lg:col-span-5 space-y-8">
            <Link to="/" className="inline-block">
              <span className="type-subtitle font-serif italic tracking-tight text-[#4A3F35]">
                MERA Cosmetics
              </span>
            </Link>
            <p className="type-subtitle text-[#7A6F65] italic max-w-sm font-serif opacity-80">
              {t('footer.tagline')}
            </p>
            <p className="type-ui uppercase text-[#8B7355] font-medium opacity-60 italic">
              {t('footer.discount1')}
            </p>
            <p className="type-ui uppercase text-[#8B7355] font-medium opacity-60 italic mt-1">
              {t('footer.discount2')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="group w-10 h-10 rounded-full border border-[#4A3F35]/10 flex items-center justify-center text-[#7A6F65] hover:text-[#8B7355] hover:border-[#8B7355]/35 transition-all duration-500 hover:scale-110 hover:-rotate-6 hover:shadow-md active:scale-95"
                >
                  {getSocialIcon(item.label) ?? item.shortLabel}
                </a>
              ))}
            </div>
          </div>

          <div data-footer-reveal className="lg:col-span-3">
            <h4 className="type-ui uppercase text-[#8B7355] mb-12 font-bold opacity-60">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className="type-subtitle text-[#7A6F65] hover:text-[#4A3F35] transition-all duration-700 font-serif italic relative group inline-block py-1"
                  >
                    <span className="relative z-10">{t(`nav.${item.key}`)}</span>
                    <span className="absolute bottom-1 left-0 w-0 h-[0.5px] bg-[#8B7355]/40 transition-all duration-700 group-hover:w-full"></span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-reveal className="lg:col-span-4">
            <h4 className="type-ui uppercase text-[#8B7355] mb-10 font-medium">
              {t('footer.contact')}
            </h4>
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="type-subtitle text-[#4A3F35] font-serif italic">MERA Cosmetics</p>
                <p className="type-text text-[#7A6F65] font-serif opacity-80">
                  Staffelackerstrasse 11
                  <br />
                  8953 Dietikon, CH
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href="tel:+41782111503"
                  className="type-text text-[#7A6F65] hover:text-[#4A3F35] transition-colors duration-300 block font-serif"
                >
                  +41 78 211 15 03
                </a>
                <a
                  href="mailto:info@meracosmetics.ch"
                  className="type-text text-[#7A6F65] hover:text-[#4A3F35] transition-colors duration-300 block font-serif underline underline-offset-4 decoration-[#8B7355]/20 hover:decoration-[#8B7355]"
                >
                  info@meracosmetics.ch
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          data-footer-reveal
          className="pt-10 border-t border-[#4A3F35]/5 flex flex-col md:flex-row justify-between items-center gap-8 type-text text-[#7A6F65]/60"
        >
          <p className="transition-colors duration-300">
            © {new Date().getFullYear()} MERA Cosmetics | {t('footer.rights')}
          </p>
          <div className="flex gap-12 font-medium">
            <Link
              to="/kontakt"
              className="relative inline-block hover:text-[#8B7355] transition-all duration-300 hover:-translate-y-px after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[#8B7355]/50 hover:after:w-full after:transition-all after:duration-300"
            >
              {t('footer.imprint')}
            </Link>
            <Link
              to="/kontakt"
              className="relative inline-block hover:text-[#8B7355] transition-all duration-300 hover:-translate-y-px after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[#8B7355]/50 hover:after:w-full after:transition-all after:duration-300"
            >
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
