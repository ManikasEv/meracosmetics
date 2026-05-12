import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Seo from '../components/seo/Seo'
import { createTranslator } from '../i18n/textTable'
import logoWatermark from '../assets/Logo.jpeg'

gsap.registerPlugin(ScrollTrigger)

const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=MERA%20Cosmetics%20by%20Viviane%20Rovito%20Stampfenbachstrasse%20151%208006%20Z%C3%BCrich&output=embed'

const PHONE_TEL = '+41782111503'
const PHONE_DISPLAY = '+41 78 211 15 03'
const EMAIL = 'info@meracosmetics.ch'

/** Aligned with meracosmetics.ch / kontakt (Figma bundle `Hm`). */
const COPY = {
  de: {
    seoTitle: 'Kontakt',
    seoDescription:
      'Kontaktiere MERA Cosmetics in Zürich: Studio, Oeffnungszeiten, WhatsApp, E-Mail und Termin.',
    subtitle:
      'Ich freue mich auf dich. Vereinbare jetzt deinen Termin und erlebe einen Moment der Ruhe.',
    title: 'Kontakt',
    studioTag: 'Das Studio',
    studioName: 'MERA Cosmetics by Viviane Rovito',
    address1: 'Stampfenbachstrasse 151',
    address2: '8006 Zürich',
    address3: 'Schweiz',
    hoursTitle: 'Öffnungszeiten',
    hoursWeekday: 'Mittwoch - Freitag',
    hoursWeekdayTime: '10:00 - 19:00 Uhr',
    hoursSaturday: 'Samstag',
    hoursSaturdayTime: '10:00 - 17:00 Uhr',
    hoursSunday: 'Sonntag - Dienstag',
    hoursSundayTime: 'Geschlossen',
    hoursNote:
      'Termine nach Vereinbarung. Auf Anfrage bieten wir auch Termine ausserhalb der offiziellen Öffnungszeiten an.',
    locationNote:
      'Das Studio wird räumlich geteilt. Die Unternehmen sind jedoch rechtlich und wirtschaftlich unabhängig voneinander.',
    connectTag: "Let's Connect",
    connectWhatsappTag: 'Schnellste Antwort',
    connectEmailTag: 'Direktnachricht',
    connectVoiceTag: 'Anruf',
    bookingText:
      'Für Terminanfragen ruf mich gerne an, schreib mir eine E-Mail oder kontaktiere mich über WhatsApp. Ich melde mich schnellstmöglich bei dir zurück.',
    bookingLanguages: 'Beratung und Behandlung auf Deutsch, Englisch und ΕΛΛΗΝΙΚΆ möglich.',
    whatsappMessage:
      'Hallo, ich möchte gerne einen Termin bei MERA Cosmetics vereinbaren.',
  },
  en: {
    seoTitle: 'Contact',
    seoDescription:
      'Contact MERA Cosmetics in Zürich: studio, opening hours, WhatsApp, email, and appointments.',
    subtitle:
      'I look forward to meeting you. Book your appointment now and experience a moment of peace.',
    title: 'Contact',
    studioTag: 'The Studio',
    studioName: 'MERA Cosmetics by Viviane Rovito',
    address1: 'Stampfenbachstrasse 151',
    address2: '8006 Zürich',
    address3: 'Switzerland',
    hoursTitle: 'Opening hours',
    hoursWeekday: 'Wednesday - Friday',
    hoursWeekdayTime: '10:00 - 19:00',
    hoursSaturday: 'Saturday',
    hoursSaturdayTime: '10:00 - 17:00',
    hoursSunday: 'Sunday - Tuesday',
    hoursSundayTime: 'Closed',
    hoursNote:
      'By appointment. Upon request, we also offer appointments outside of official opening hours.',
    locationNote:
      'The studio is spatially shared. However, the businesses are legally and economically independent.',
    connectTag: "Let's Connect",
    connectWhatsappTag: 'Fastest Response',
    connectEmailTag: 'Direct Message',
    connectVoiceTag: 'Call',
    bookingText:
      'For appointment requests, please call me, send me an email or contact me via WhatsApp. I will get back to you as soon as possible.',
    bookingLanguages: 'Consultation and treatment available in German, English and ΕΛΛΗΝΙΚΆ.',
    whatsappMessage:
      'Hello, I would like to book an appointment at MERA Cosmetics.',
  },
  gr: {
    seoTitle: 'Επικοινωνία',
    seoDescription:
      'Επικοινώνησε με τη MERA Cosmetics στη Ζυρίχη: στούντιο, ώρες, WhatsApp, email και ραντεβού.',
    subtitle:
      'Χαίρομαι να σε δεχθώ. Κλείσε το ραντεβού σου τώρα και βίωσε μια στιγμή ηρεμίας.',
    title: 'Επικοινωνία',
    studioTag: 'Το Στούντιο',
    studioName: 'MERA Cosmetics by Viviane Rovito',
    address1: 'Stampfenbachstrasse 151',
    address2: '8006 Zürich',
    address3: 'Ελβετία',
    hoursTitle: 'Ωράρια λειτουργίας',
    hoursWeekday: 'Τετάρτη - Παρασκευή',
    hoursWeekdayTime: '10:00 - 19:00',
    hoursSaturday: 'Σάββατο',
    hoursSaturdayTime: '10:00 - 17:00',
    hoursSunday: 'Κυριακή - Τρίτη',
    hoursSundayTime: 'Κλειστό',
    hoursNote:
      'Με ραντεβού. Κατόπιν αιτήματος, προσφέρουμε επίσης ραντεβού εκτός των επίσημων ωρών λειτουργίας.',
    locationNote:
      'Το στούντιο μοιράζεται χωρικά. Ωστόσο, οι επιχειρήσεις είναι νομικά και οικονομικά ανεξάρτητες.',
    connectTag: 'Ας συνδεθούμε',
    connectWhatsappTag: 'Γρήγορότερη απάντηση',
    connectEmailTag: 'Άμεσο μήνυμα',
    connectVoiceTag: 'Κλήση',
    bookingText:
      'Για αιτήσεις ραντεβού, μπορείς να με καλέσεις, να μου στείλεις email ή να επικοινωνήσεις μέσω WhatsApp. Θα επικοινωνήσω μαζί σου το συντομότερο δυνατόν.',
    bookingLanguages:
      'Συμβουλευτική και θεραπεία διαθέσιμη στα Γερμανικά, Αγγλικά και ΕΛΛΗΝΙΚΆ.',
    whatsappMessage:
      'Γεια σας, θα ήθελα να κλείσω ραντεβού στο MERA Cosmetics.',
  },
}

const SOCIAL = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/mera.cosmetics.zh/',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@mera.cosmetics.zh?lang=de-DE',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61586948390288',
  },
]

function ContactPage({ language }) {
  const t = createTranslator(language)
  const locale = language === 'en' || language === 'gr' ? language : 'de'
  const copy = COPY[locale]
  const mainRef = useRef(null)

  const whatsappHref = `https://wa.me/${PHONE_TEL}?text=${encodeURIComponent(copy.whatsappMessage)}`
  const mailtoHref = `mailto:${EMAIL}`

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduced) {
        gsap.set('[data-contact-hero-bg] img', { opacity: 0.035, scale: 1 })
        const els = gsap.utils.toArray('[data-contact-hero-el]')
        if (els[0]) gsap.set(els[0], { opacity: 1, y: 0, clearProps: 'visibility' })
        if (els[1]) gsap.set(els[1], { opacity: 1, y: 0, clearProps: 'visibility' })
        if (els[2]) gsap.set(els[2], { opacity: 0.4, y: 0 })
        gsap.set('[data-contact-reveal]', { clearProps: 'all' })
        gsap.set('[data-contact-footer]', { opacity: 0.1 })
        return
      }

      const warm = 'power2.out'
      const soft = 'sine.out'

      // Hero: soft watermark bloom + staggered copy (calm, welcoming)
      const heroEls = gsap.utils.toArray('[data-contact-hero-el]')
      const heroTl = gsap.timeline({ defaults: { ease: warm } })
      heroTl.fromTo(
        '[data-contact-hero-bg] img',
        { opacity: 0, scale: 1.07 },
        { opacity: 0.035, scale: 1, duration: 2.35, ease: soft },
        0,
      )
      if (heroEls[0]) {
        heroTl.fromTo(
          heroEls[0],
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.95 },
          0.18,
        )
      }
      if (heroEls[1]) {
        heroTl.fromTo(
          heroEls[1],
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 1 },
          0.32,
        )
      }
      if (heroEls[2]) {
        heroTl.fromTo(
          heroEls[2],
          { opacity: 0, y: 14 },
          { opacity: 0.4, y: 0, duration: 0.88, ease: warm },
          0.48,
        )
      }

      // Left column: studio → map → note → hours (gentle cascade)
      gsap.from('[data-contact-left-col] > [data-contact-reveal]', {
        autoAlpha: 0,
        y: 30,
        duration: 0.92,
        stagger: 0.13,
        ease: warm,
        scrollTrigger: {
          trigger: '[data-contact-left-col]',
          start: 'top 84%',
          once: true,
        },
      })

      // Right column: connect row → cards → booking + social (gentle ripple)
      gsap.from(
        gsap.utils.toArray('[data-contact-right-col] [data-contact-reveal]'),
        {
          autoAlpha: 0,
          y: 26,
          duration: 0.82,
          stagger: 0.09,
          ease: warm,
          scrollTrigger: {
            trigger: '[data-contact-right-col]',
            start: 'top 86%',
            once: true,
          },
        },
      )

      // Footer ornament: stays low-contrast (matches Tailwind opacity-10)
      gsap.fromTo(
        '[data-contact-footer]',
        { opacity: 0, y: 8 },
        {
          opacity: 0.1,
          y: 0,
          duration: 0.85,
          ease: soft,
          scrollTrigger: {
            trigger: '[data-contact-footer]',
            start: 'top 94%',
            once: true,
          },
        },
      )
    }, mainRef)

    return () => ctx.revert()
  }, [locale])

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-[#FAF7F2] pt-[86px] lg:pt-[94px]"
    >
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path="/kontakt"
        lang={locale}
        keywords="Kontakt MERA Cosmetics, Kosmetik Dietikon, Oeffnungszeiten, WhatsApp, Termin"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Kontakt - MERA Cosmetics',
          url: 'https://www.meracosmetics.ch/kontakt',
          mainEntity: {
            '@type': 'BeautySalon',
            name: 'MERA Cosmetics',
            telephone: PHONE_DISPLAY,
            email: EMAIL,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Stampfenbachstrasse 151',
              postalCode: '8006',
              addressLocality: 'Zürich',
              addressCountry: 'CH',
            },
          },
        }}
      />

      {/* Hero — scaled down for calmer proportions */}
      <section className="relative overflow-visible px-6 pb-14 pt-12 sm:pt-16 lg:px-12 lg:pb-20">
        {/* Fully inside viewport: anchored from the right with positive inset (no negative right %) */}
        <div
          data-contact-hero-bg
          className="pointer-events-none absolute right-0 top-[-4%] w-[min(72vw,300px)] max-w-[300px] select-none sm:right-2 sm:top-[-5%] sm:w-[min(55vw,340px)] sm:max-w-[340px] lg:right-6 lg:max-w-[360px]"
        >
          <img
            src={logoWatermark}
            alt=""
            className="w-full rotate-12 opacity-0"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl">
          <div>
            <span
              data-contact-hero-el
              className="mb-4 block text-[0.5rem] font-medium uppercase tracking-[0.45em] text-[#8B7355] opacity-0 sm:mb-5 sm:text-[0.5625rem]"
            >
              {copy.subtitle}
            </span>
            <h1 className="font-serif text-4xl leading-[0.92] tracking-tighter text-[#4A3F35] sm:text-6xl lg:text-7xl">
              <span data-contact-hero-el className="block opacity-0">
                {copy.title}
              </span>
              <span
                data-contact-hero-el
                className="mt-1.5 block font-serif text-[0.42em] italic tracking-normal opacity-0 sm:mt-2.5"
              >
                by Viviane
              </span>
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            {/* Left: studio, map, hours, location note */}
            <div
              className="space-y-10 lg:col-span-5 lg:space-y-14"
              data-contact-left-col
            >
              <div data-contact-reveal className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="h-px w-6 bg-[#8B7355]/30" />
                  <h2 className="text-[0.5rem] font-medium uppercase tracking-[0.35em] text-[#8B7355] sm:text-[0.5625rem]">
                    {copy.studioTag}
                  </h2>
                </div>
                <div className="pl-0 sm:pl-10">
                  <h3 className="mb-3 font-serif text-lg italic text-[#4A3F35] sm:text-xl">
                    {copy.studioName}
                  </h3>
                  <div className="space-y-0.5 font-serif text-sm leading-relaxed text-[#7A6F65] opacity-80 sm:text-base">
                    <p>{copy.address1}</p>
                    <p>{copy.address2}</p>
                    <p>{copy.address3}</p>
                  </div>
                </div>
              </div>

              <div
                data-contact-reveal
                className="aspect-video max-h-[260px] overflow-hidden rounded-2xl border border-[#4A3F35]/5 shadow-sm grayscale transition-all duration-1000 hover:grayscale-0 sm:max-h-[280px] lg:aspect-square lg:max-h-[300px]"
              >
                <iframe
                  title="MERA Cosmetics Location"
                  src={MAP_EMBED_SRC}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-full min-h-[180px] w-full border-0"
                />
              </div>

              <p
                data-contact-reveal
                className="text-[0.6875rem] leading-relaxed text-[#7A6F65] sm:text-xs"
              >
                {copy.locationNote}
              </p>

              <div
                data-contact-reveal
                className="rounded-2xl border border-[#8B7355]/5 bg-white/40 p-6 backdrop-blur-sm transition-colors duration-700 group hover:bg-white/60 sm:p-8"
              >
                <h2 className="mb-5 text-[0.5rem] font-medium uppercase tracking-[0.35em] text-[#8B7355] sm:text-[0.5625rem]">
                  {copy.hoursTitle}
                </h2>
                <div className="space-y-4">
                  {[
                    { label: copy.hoursWeekday, time: copy.hoursWeekdayTime },
                    { label: copy.hoursSaturday, time: copy.hoursSaturdayTime },
                    {
                      label: copy.hoursSunday,
                      time: copy.hoursSundayTime,
                      italic: true,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="group/item flex items-center justify-between gap-3"
                    >
                      <span className="text-xs font-serif italic text-[#7A6F65] transition-colors group-hover/item:text-[#4A3F35] sm:text-sm">
                        {row.label}
                      </span>
                      <span
                        className={`text-right text-xs font-medium text-[#4A3F35] sm:text-sm ${row.italic ? 'italic opacity-50' : ''}`}
                      >
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-[#8B7355]/10 pt-5">
                  <p className="font-serif text-[0.6875rem] italic leading-relaxed text-[#8B7355] sm:text-xs">
                    {copy.hoursNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: connect cards + booking + social */}
            <div className="space-y-8 lg:col-span-7 lg:pl-8 xl:pl-10" data-contact-right-col>
              <div data-contact-reveal className="mb-8 flex items-center gap-4 sm:mb-10">
                <h2 className="text-[0.5rem] font-medium uppercase tracking-[0.35em] text-[#8B7355] sm:text-[0.5625rem]">
                  {copy.connectTag}
                </h2>
                <div className="h-px flex-grow bg-[#8B7355]/10" />
              </div>

                <div className="space-y-3">
                  <a
                    data-contact-reveal
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between overflow-hidden rounded-2xl bg-[#8B7355] p-4 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg sm:p-6"
                  >
                    <div className="relative z-10">
                      <span className="mb-1 block text-[0.45rem] font-medium uppercase tracking-[0.35em] text-white/50 sm:text-[0.5rem]">
                        {copy.connectWhatsappTag}
                      </span>
                      <h3 className="font-serif text-lg italic leading-none text-white sm:text-2xl">
                        WhatsApp
                      </h3>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:bg-white group-hover:text-[#8B7355] sm:h-9 sm:w-9">
                      <span className="text-base text-white transition-colors group-hover:text-[#8B7355] sm:text-lg">
                        →
                      </span>
                    </div>
                  </a>

                  <a
                    data-contact-reveal
                    href={mailtoHref}
                    className="group flex items-center justify-between rounded-2xl border border-[#8B7355]/20 bg-white p-4 text-[#4A3F35] antialiased transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md max-sm:border-[#8B7355]/28 max-sm:shadow-sm sm:border-[#8B7355]/10 sm:p-6"
                  >
                    <div>
                      <span className="mb-1 block text-[0.45rem] font-medium uppercase tracking-[0.35em] text-[#5C4A3A] sm:text-[0.5rem] sm:text-[#8B7355]/40">
                        {copy.connectEmailTag}
                      </span>
                      <h3 className="font-serif text-lg italic leading-none text-[#3A3028] sm:text-2xl sm:text-[#4A3F35]">
                        E-Mail
                      </h3>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8B7355]/25 transition-all duration-500 group-hover:border-[#8B7355] max-sm:border-[#8B7355]/35 sm:h-9 sm:w-9 sm:border-[#8B7355]/10">
                      <span className="text-base text-[#8B7355]/55 transition-colors group-hover:text-[#8B7355] max-sm:text-[#6B5B48] sm:text-lg sm:text-[#8B7355]/30">
                        →
                      </span>
                    </div>
                  </a>

                  <a
                    data-contact-reveal
                    href={`tel:${PHONE_TEL}`}
                    className="group flex items-center justify-between rounded-2xl border border-[#8B7355]/20 bg-white p-4 text-[#4A3F35] antialiased transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md max-sm:border-[#8B7355]/28 max-sm:shadow-sm sm:border-[#8B7355]/10 sm:p-6"
                  >
                    <div>
                      <span className="mb-1 block text-[0.45rem] font-medium uppercase tracking-[0.35em] text-[#5C4A3A] sm:text-[0.5rem] sm:text-[#8B7355]/40">
                        {copy.connectVoiceTag}
                      </span>
                      <h3 className="font-serif text-lg italic leading-none text-[#3A3028] sm:text-2xl sm:text-[#4A3F35]">
                        {PHONE_DISPLAY}
                      </h3>
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#8B7355]/25 transition-all duration-500 group-hover:border-[#8B7355] max-sm:border-[#8B7355]/35 sm:h-9 sm:w-9 sm:border-[#8B7355]/10">
                      <span className="text-base text-[#8B7355]/55 transition-colors group-hover:text-[#8B7355] max-sm:text-[#6B5B48] sm:text-lg sm:text-[#8B7355]/30">
                        →
                      </span>
                    </div>
                  </a>
                </div>

                <div data-contact-reveal className="space-y-8 pt-10 sm:space-y-10 sm:pt-14">
                  <div className="space-y-3">
                    <p className="max-w-md font-serif text-xs italic leading-relaxed text-[#7A6F65] opacity-80 sm:text-sm">
                      {copy.bookingText}
                    </p>
                    <p className="text-[0.5rem] font-medium uppercase tracking-[0.18em] text-[#8B7355] sm:text-[0.5625rem]">
                      {t('footer.discount1')}
                    </p>
                    <p className="text-[0.5rem] font-medium uppercase tracking-[0.18em] text-[#8B7355] sm:text-[0.5625rem]">
                      {t('footer.discount2')}
                    </p>
                    <p className="text-[0.5rem] font-medium uppercase tracking-[0.18em] text-[#8B7355] sm:text-[0.5625rem]">
                      {copy.bookingLanguages}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-[#4A3F35]/5 pt-8 sm:gap-x-10 sm:pt-10">
                    {SOCIAL.map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-block overflow-hidden py-0.5"
                      >
                        <span className="block font-serif text-base italic text-[#4A3F35] transition-transform duration-500 group-hover:-translate-y-full sm:text-lg">
                          {s.name}
                        </span>
                        <span className="absolute left-0 top-0 translate-y-full font-serif text-xs italic text-[#8B7355] opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 sm:text-sm">
                          {s.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-contact-footer
        className="flex items-center justify-center border-t border-[#4A3F35]/5 py-8 opacity-10"
      >
        <div className="h-px w-10 bg-[#8B7355]" />
        <img src={logoWatermark} alt="" className="h-6 px-6 sm:h-7 sm:px-7" />
        <div className="h-px w-10 bg-[#8B7355]" />
      </section>
    </main>
  )
}

export default ContactPage
