import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import { bookingUrl, navLinks } from '../../constants/siteData'
import { createTranslator, LANGUAGES } from '../../i18n/textTable'
import navLogo from '../../assets/Logo.jpeg'

function Header({
  scrolled,
  menuOpen,
  language,
  onLanguageChange,
  onMenuToggle,
  onMenuClose,
}) {
  const [languageOpen, setLanguageOpen] = useState(false)
  const languageRef = useRef(null)
  const dropdownRef = useRef(null)
  const mobilePanelRef = useRef(null)
  const activeLanguage = LANGUAGES.find((item) => item.locale === language) ?? LANGUAGES[0]
  const t = createTranslator(language)

  useLayoutEffect(() => {
    if (!languageOpen || !dropdownRef.current) return
    const panel = dropdownRef.current
    const rows = panel.querySelectorAll('button')
    gsap.killTweensOf([panel, ...rows])
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      panel,
      { autoAlpha: 0, y: -10, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.38 },
    )
    tl.fromTo(
      rows,
      { x: 12, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, stagger: 0.055, duration: 0.32, ease: 'power2.out' },
      '-=0.22',
    )
  }, [languageOpen])

  useLayoutEffect(() => {
    if (!menuOpen || !mobilePanelRef.current) return
    const nodes = mobilePanelRef.current.querySelectorAll('[data-mobile-animate]')
    gsap.fromTo(
      nodes,
      { autoAlpha: 0, y: 22 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.48,
        stagger: 0.065,
        ease: 'power3.out',
        delay: 0.06,
      },
    )
  }, [menuOpen])

  useEffect(() => {
    function handleClickOutside(event) {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-3 bg-[#FDFBF8]/96 backdrop-blur-xl shadow-xs border-b border-[#4A3F35]/5' : 'py-3 lg:py-4 bg-[#FDFBF8] border-b border-[#4A3F35]/5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="relative z-10 inline-block transition-transform duration-500 hover:scale-[1.04] active:scale-[0.98]"
              onClick={onMenuClose}
            >
              <img
                src={navLogo}
                alt="MERA Cosmetics monogram"
                className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    `relative block py-2 ${isActive ? '' : 'group'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`type-text inline-block font-serif italic transition-all duration-500 ${
                          isActive
                            ? 'text-[#4A3F35] -translate-y-0.5'
                            : 'text-[#7A6F65] group-hover:text-[#4A3F35] group-hover:-translate-y-0.5'
                        }`}
                      >
                        {t(`nav.${item.key}`)}
                      </span>
                      <span
                        className={`absolute -bottom-0.5 left-0 right-0 h-px origin-left bg-[#8B7355]/35 transition-transform duration-500 ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                        aria-hidden
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-4 lg:gap-8">
              <div className="hidden lg:block relative" ref={languageRef}>
                <button
                  type="button"
                  onClick={() => setLanguageOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-[#5E5349] hover:text-[#4A3F35] transition-all duration-300 group rounded-full px-1 py-1 -mr-1 hover:bg-[#4A3F35]/5"
                  aria-label="Sprache auswählen"
                  aria-expanded={languageOpen}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-3.5 h-3.5 text-[#5E5349] opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3 12h18M12 3c2.5 2.6 2.5 14.4 0 18M12 3c-2.5 2.6-2.5 14.4 0 18" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <span className="type-ui uppercase font-medium text-[#4A3F35]">
                    {activeLanguage.code}
                  </span>
                </button>

                {languageOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-full mt-3 bg-white shadow-2xl rounded-xl overflow-hidden min-w-[148px] border border-[#4A3F35]/5"
                  >
                    {LANGUAGES.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          onLanguageChange(item.locale)
                          setLanguageOpen(false)
                        }}
                        className={`w-full px-3 py-2.5 text-left grid grid-cols-[28px_1fr] items-center gap-2.5 transition-all duration-300 hover:bg-[#FAF7F2] hover:pl-4 ${activeLanguage.code === item.code ? 'bg-[#FAF7F2]' : ''}`}
                      >
                        <span
                          className={`type-ui uppercase font-medium ${activeLanguage.code === item.code ? 'text-[#6B5540]' : 'text-[#4A3F35]'}`}
                        >
                          {item.code}
                        </span>
                        <span
                          className={`type-ui leading-none uppercase font-medium justify-self-start ${activeLanguage.code === item.code ? 'text-[#3D342C]' : 'text-[#4A3F35]'}`}
                        >
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mera-pill hidden lg:inline-flex items-center justify-center px-5 py-2 bg-[#8B7355] text-white type-ui uppercase rounded-full hover:bg-[#6B5540] transition-all duration-500 font-medium shadow-[0_6px_20px_rgba(74,63,53,0.18)] hover:shadow-[0_10px_28px_rgba(74,63,53,0.28)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                {t('nav.book')}
              </a>

              <button
                type="button"
                onClick={onMenuToggle}
                className="lg:hidden p-2.5 text-[#4A3F35] bg-[#E8DDD0]/20 rounded-full transition-all duration-300 hover:bg-[#E8DDD0]/40 hover:scale-105 active:scale-95"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? '×' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#FAF7F2] z-40 lg:hidden flex flex-col pt-24 px-6 overflow-y-auto">
          <div ref={mobilePanelRef} className="space-y-8 flex flex-col pb-12">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                data-mobile-animate
                to={item.href}
                end={item.href === '/'}
                onClick={onMenuClose}
                className={({ isActive }) =>
                  `type-subtitle block font-serif italic transition-all duration-300 ${
                    isActive
                      ? 'border-l-2 border-[#8B7355]/45 pl-3 text-[#5C4A3A]'
                      : 'border-l-2 border-transparent pl-3 text-[#4A3F35] hover:translate-x-1'
                  }`
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <div data-mobile-animate className="pt-2 flex gap-3">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => onLanguageChange(item.locale)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border type-ui uppercase transition-all duration-300 font-medium hover:scale-110 ${activeLanguage.code === item.code ? 'bg-[#8B7355] text-white border-[#8B7355] shadow-md' : 'border-[#4A3F35]/18 text-[#5E5349] hover:border-[#8B7355]/45 hover:text-[#4A3F35]'}`}
                >
                  {item.code}
                </button>
              ))}
            </div>
            <div data-mobile-animate className="pt-4">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mera-pill inline-flex px-10 py-4 bg-[#8B7355] text-white type-ui uppercase rounded-full font-medium shadow-[0_10px_28px_rgba(74,63,53,0.2)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-500"
              >
                {t('nav.book')}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
