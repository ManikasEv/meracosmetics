import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { bookingUrl, whatsappUrl } from '../constants/siteData'
import Seo from '../components/seo/Seo'
import { SplitLetters } from '../components/animations/SplitLetters'
import meraLogoWatermark from '../assets/Logo.jpeg'

gsap.registerPlugin(ScrollTrigger)

const CATEGORY_FILTERS = [
  { value: 'all', label: { de: 'ALLE', en: 'ALL', gr: 'ΟΛΑ' } },
  { value: 'manicure', label: { de: 'MANIKÜRE', en: 'MANICURE', gr: 'ΜΑΝΙΚΙΟΥΡ' } },
  { value: 'pedicure', label: { de: 'PEDIKÜRE', en: 'PEDICURE', gr: 'ΠΕΝΤΙΚΙΟΥΡ' } },
  { value: 'waxing', label: { de: 'WAXING', en: 'WAXING', gr: 'ΑΠΟΤΡΙΧΩΣΗ' } },
  { value: 'lashes', label: { de: 'WIMPERN & BRAUEN', en: 'LASHES & BROWS', gr: 'ΒΛΕΦΑΡΙΔΕΣ & ΦΡΥΔΙΑ' } },
  { value: 'body', label: { de: 'KÖRPER', en: 'BODY', gr: 'ΣΩΜΑ' } },
]

const TREATMENT_GROUPS = [
  {
    id: 'manicure',
    category: { de: 'Maniküre', en: 'Manicure', gr: 'Μανικιούρ' },
    items: [
      {
        name: { de: 'Basis Maniküre', en: 'Basic Manicure', gr: 'Βασικό Μανικιούρ' },
        duration: { de: '40 Min', en: '40 Min', gr: '40 Λεπτά' },
        price: 'CHF 55',
      },
      {
        name: { de: 'Maniküre mit Nagellack', en: 'Manicure with Nail Polish', gr: 'Μανικιούρ με Βερνίκι' },
        duration: { de: '50 Min', en: '50 Min', gr: '50 Λεπτά' },
        price: 'CHF 65',
      },
      {
        name: { de: 'Gellack Maniküre', en: 'Gel Polish Manicure', gr: 'Μανικιούρ με Gel' },
        duration: { de: '60 Min', en: '60 Min', gr: '60 Λεπτά' },
        price: 'CHF 75',
      },
      {
        name: { de: 'Gellack Entfernung', en: 'Gel Polish Removal', gr: 'Αφαίρεση Gel' },
        duration: { de: '+10 Min', en: '+10 Min', gr: '+10 Λεπτά' },
        price: 'CHF 5',
      },
      {
        name: { de: 'Hand Peeling', en: 'Hand Peeling', gr: 'Peeling Χεριών' },
        duration: { de: '+15 Min', en: '+15 Min', gr: '+15 Λεπτά' },
        price: 'CHF 25',
      },
    ],
  },
  {
    id: 'pedicure',
    category: { de: 'Pediküre', en: 'Pedicure', gr: 'Πεντικιούρ' },
    items: [
      {
        name: { de: 'Basis Pediküre', en: 'Basic Pedicure', gr: 'Βασικό Πεντικιούρ' },
        duration: { de: '50 Min', en: '50 Min', gr: '50 Λεπτά' },
        price: 'CHF 65',
      },
      {
        name: { de: 'Pediküre mit Nagellack', en: 'Pedicure with Nail Polish', gr: 'Πεντικιούρ με Βερνίκι' },
        duration: { de: '60 Min', en: '60 Min', gr: '60 Λεπτά' },
        price: 'CHF 75',
      },
      {
        name: { de: 'Gellack Pediküre', en: 'Gel Polish Pedicure', gr: 'Πεντικιούρ με Gel' },
        duration: { de: '70 Min', en: '70 Min', gr: '70 Λεπτά' },
        price: 'CHF 85',
      },
      {
        name: { de: 'Gellack Entfernung', en: 'Gel Polish Removal', gr: 'Αφαίρεση Gel' },
        duration: { de: '+10 Min', en: '+10 Min', gr: '+10 Λεπτά' },
        price: 'CHF 5',
      },
      {
        name: { de: 'Fuss Peeling', en: 'Foot Peeling', gr: 'Peeling Ποδιών' },
        duration: { de: '+15 Min', en: '+15 Min', gr: '+15 Λεπτά' },
        price: 'CHF 25',
      },
      {
        name: { de: 'Fussmassage', en: 'Foot Massage', gr: 'Μασάζ Ποδιών' },
        duration: { de: '+15 Min', en: '+15 Min', gr: '+15 Λεπτά' },
        price: 'CHF 15',
      },
    ],
  },
  {
    id: 'waxing',
    category: { de: 'Waxing', en: 'Waxing', gr: 'Αποτρίχωση' },
    sections: [
      {
        name: { de: 'Beine & Arme', en: 'Legs & Arms', gr: 'Πόδια & Χέρια' },
        items: [
          {
            name: { de: 'Ganze Beine', en: 'Full Legs', gr: 'Ολόκληρα Πόδια' },
            duration: { de: '45 Min', en: '45 Min', gr: '45 Λεπτά' },
            price: 'CHF 95',
          },
          {
            name: { de: 'Halbe Beine', en: 'Half Legs', gr: 'Μισά Πόδια' },
            duration: { de: '30 Min', en: '30 Min', gr: '30 Λεπτά' },
            price: 'CHF 65',
          },
          {
            name: { de: 'Ganze Arme', en: 'Full Arms', gr: 'Ολόκληρα Χέρια' },
            duration: { de: '30 Min', en: '30 Min', gr: '30 Λεπτά' },
            price: 'CHF 65',
          },
          {
            name: { de: 'Halbe Arme', en: 'Half Arms', gr: 'Μισά Χέρια' },
            duration: { de: '20 Min', en: '20 Min', gr: '20 Λεπτά' },
            price: 'CHF 35',
          },
        ],
      },
      {
        name: { de: 'Intimbereich', en: 'Intimate Area', gr: 'Ευαίσθητη Περιοχή' },
        items: [
          {
            name: { de: 'Bikinizone', en: 'Bikini Line', gr: 'Γραμμή Μπικίνι' },
            duration: { de: '20 Min', en: '20 Min', gr: '20 Λεπτά' },
            price: 'CHF 45',
          },
          {
            name: { de: 'Brazilian', en: 'Brazilian', gr: 'Brazilian' },
            duration: { de: '35 Min', en: '35 Min', gr: '35 Λεπτά' },
            price: 'CHF 85',
          },
          {
            name: { de: 'Achseln', en: 'Underarms', gr: 'Μασχάλες' },
            duration: { de: '15 Min', en: '15 Min', gr: '15 Λεπτά' },
            price: 'CHF 45',
          },
        ],
      },
      {
        name: { de: 'Gesicht', en: 'Face', gr: 'Πρόσωπο' },
        items: [
          {
            name: { de: 'Augenbrauen', en: 'Eyebrows', gr: 'Φρύδια' },
            duration: { de: '15 Min', en: '15 Min', gr: '15 Λεπτά' },
            price: 'CHF 25',
          },
          {
            name: { de: 'Oberlippe', en: 'Upper Lip', gr: 'Άνω Χείλος' },
            duration: { de: '10 Min', en: '10 Min', gr: '10 Λεπτά' },
            price: 'CHF 15',
          },
          {
            name: { de: 'Kinn', en: 'Chin', gr: 'Πηγούνι' },
            duration: { de: '10 Min', en: '10 Min', gr: '10 Λεπτά' },
            price: 'CHF 15',
          },
          {
            name: { de: 'Halbes Gesicht', en: 'Half Face', gr: 'Μισό Πρόσωπο' },
            duration: { de: '20 Min', en: '20 Min', gr: '20 Λεπτά' },
            price: 'CHF 35',
          },
          {
            name: { de: 'Ganzes Gesicht', en: 'Full Face', gr: 'Ολόκληρο Πρόσωπο' },
            duration: { de: '30 Min', en: '30 Min', gr: '30 Λεπτά' },
            price: 'CHF 50',
          },
        ],
      },
      {
        name: { de: 'Oberkörper', en: 'Upper Body', gr: 'Άνω Σώμα' },
        items: [
          {
            name: { de: 'Halber Rücken', en: 'Half Back', gr: 'Μισή Πλάτη' },
            duration: { de: '30 Min', en: '30 Min', gr: '30 Λεπτά' },
            price: 'CHF 55',
          },
          {
            name: { de: 'Ganzer Rücken', en: 'Full Back', gr: 'Ολόκληρη Πλάτη' },
            duration: { de: '40 Min', en: '40 Min', gr: '40 Λεπτά' },
            price: 'CHF 65',
          },
          {
            name: { de: 'Schultern', en: 'Shoulders', gr: 'Ώμοι' },
            duration: { de: '15 Min', en: '15 Min', gr: '15 Λεπτά' },
            price: 'CHF 25',
          },
          {
            name: { de: 'Brust', en: 'Chest', gr: 'Στήθος' },
            duration: { de: '20 Min', en: '20 Min', gr: '20 Λεπτά' },
            price: 'CHF 30',
          },
          {
            name: { de: 'Bauch', en: 'Stomach', gr: 'Κοιλιά' },
            duration: { de: '20 Min', en: '20 Min', gr: '20 Λεπτά' },
            price: 'CHF 40',
          },
          {
            name: { de: 'Ganze Vorderseite', en: 'Full Front Side', gr: 'Ολόκληρο Μπροστινό Μέρος' },
            duration: { de: '35 Min', en: '35 Min', gr: '35 Λεπτά' },
            price: 'CHF 60',
          },
        ],
      },
    ],
  },
  {
    id: 'lashes',
    category: { de: 'Wimpern & Brauen', en: 'Lashes & Brows', gr: 'Βλεφαρίδες & Φρύδια' },
    items: [
      {
        name: { de: 'Wimpern färben', en: 'Lash Tinting', gr: 'Βαφή Βλεφαρίδων' },
        duration: { de: '15 Min', en: '15 Min', gr: '15 Λεπτά' },
        price: 'CHF 15',
      },
      {
        name: { de: 'Augenbrauen färben', en: 'Brow Tinting', gr: 'Βαφή Φρυδιών' },
        duration: { de: '15 Min', en: '15 Min', gr: '15 Λεπτά' },
        price: 'CHF 15',
      },
      {
        name: { de: 'Augenbrauen waxen & formen', en: 'Brow Waxing & Shaping', gr: 'Αποτρίχωση & Σχηματισμός Φρυδιών' },
        duration: { de: '25 Min', en: '25 Min', gr: '25 Λεπτά' },
        price: 'CHF 35',
      },
      {
        name: { de: 'Wimpernlifting', en: 'Lash Lifting', gr: 'Lash Lifting' },
        duration: { de: '60 Min', en: '60 Min', gr: '60 Λεπτά' },
        price: 'CHF 95',
      },
    ],
  },
  {
    id: 'body',
    category: { de: 'Körper', en: 'Body', gr: 'Σώμα' },
    items: [
      {
        name: { de: 'Rückenmassage', en: 'Back Massage', gr: 'Μασάζ Πλάτης' },
        duration: { de: '30 Min', en: '30 Min', gr: '30 Λεπτά' },
        price: 'CHF 60',
      },
      {
        name: { de: 'Ganzkörper Massage', en: 'Full Body Massage', gr: 'Μασάζ Ολόκληρου Σώματος' },
        duration: { de: '60 Min', en: '60 Min', gr: '60 Λεπτά' },
        price: 'CHF 100',
      },
      {
        name: { de: 'Rücken Peeling', en: 'Back Peeling', gr: 'Peeling Πλάτης' },
        duration: { de: '45 Min', en: '45 Min', gr: '45 Λεπτά' },
        price: 'CHF 90',
      },
      {
        name: { de: 'Ganzkörper Peeling', en: 'Full Body Peeling', gr: 'Peeling Ολόκληρου Σώματος' },
        duration: { de: '75 Min', en: '75 Min', gr: '75 Λεπτά' },
        price: 'CHF 140',
      },
    ],
  },
]

const SEO_KEYWORDS =
  'Behandlungen Dietikon, Preise Kosmetik, Manikuere, Pedikuere, Waxing, Wimpern faerben, Augenbrauen, Wimpernlifting, Rueckenmassage, Ganzkoerper Massage'

const TREATMENTS_COLUMN_CLASS = 'w-full max-w-md sm:max-w-lg mx-auto'

function ServiceListRow({ item, directBookLabel, isLast }) {
  return (
    <article
      className={`group px-4 md:px-6 lg:px-9 py-4 md:py-5 transition-all duration-300 hover:bg-[#FCF8F2] ${isLast ? '' : 'border-b border-[#4A3F35]/8'}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h4 className="type-subtitle font-serif text-[#4A3F35] transition-colors duration-300 group-hover:text-[#6D5C48]">
            {item.name}
          </h4>
          <p className="type-ui uppercase text-[#7A6F65]">{item.duration}</p>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <span className="shrink-0 type-subtitle font-serif text-[#5C4A3A] leading-none">
            {item.price}
          </span>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-mera-pill inline-flex min-w-[104px] justify-center rounded-full bg-[#7E6D52] px-5 py-2 type-ui uppercase text-white transition-all duration-300 hover:bg-[#6D5D46] hover:shadow-[0_8px_20px_rgba(74,63,53,0.28)] hover:-translate-y-px active:scale-[0.98]"
          >
            {directBookLabel}
          </a>
        </div>
      </div>
    </article>
  )
}

function ServiceListCard({ items, shouldAnimate = false, directBookLabel }) {
  return (
    <div
      data-service-card
      {...(shouldAnimate ? { 'data-treatments-block': true } : {})}
      className="rounded-[2rem] border border-[#4A3F35]/8 bg-white overflow-hidden shadow-[0_12px_30px_rgba(74,63,53,0.07)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(74,63,53,0.16)] hover:border-[#8B7355]/28"
    >
      {items.map((item, index) => (
        <ServiceListRow
          key={`${item.name}-${index}`}
          item={item}
          directBookLabel={directBookLabel}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  )
}

function GroupBlock({ group, showGroupTitle, shouldAnimate, directBookLabel }) {
  return (
    <div className="space-y-4">
      {showGroupTitle && (
        <h2 data-treatments-block={shouldAnimate ? true : undefined} className="type-title font-serif text-[#4A3F35]">
          {group.category}
        </h2>
      )}

      {group.sections ? (
        <div className="space-y-6">
          {group.sections.map((section) => (
            <div key={section.name} className="space-y-3">
              <h3 data-treatments-block={shouldAnimate ? true : undefined} className="type-subtitle font-serif italic text-[#5E5349]">
                {section.name}
              </h3>
              <ServiceListCard items={section.items} shouldAnimate={shouldAnimate} directBookLabel={directBookLabel} />
            </div>
          ))}
        </div>
      ) : (
        <ServiceListCard items={group.items} shouldAnimate={shouldAnimate} directBookLabel={directBookLabel} />
      )}
    </div>
  )
}

function TreatmentsPage({ language }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [highlightedFilter, setHighlightedFilter] = useState('all')
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const filterTransitionRef = useRef(null)
  const tabListRef = useRef(null)
  const tabIndicatorRef = useRef(null)
  const tabRefs = useRef({})
  const locale = language === 'en' || language === 'gr' ? language : 'de'

  const positionTabIndicator = useCallback((filterValue, { withDrop = false } = {}) => {
    const activeTab = tabRefs.current[filterValue]
    const el = tabIndicatorRef.current
    if (!activeTab || !el) return

    const x = activeTab.offsetLeft
    const width = activeTab.offsetWidth

    gsap.killTweensOf(el)

    if (withDrop) {
      gsap.fromTo(
        el,
        { x, width, y: -14, autoAlpha: 0.82 },
        { x, width, y: 0, autoAlpha: 1, duration: 0.52, ease: 'power3.out' },
      )
    } else {
      gsap.set(el, { y: 0 })
      gsap.to(el, {
        x,
        width,
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power3.out',
      })
    }
  }, [])

  const copy = {
    de: {
      title: 'Behandlungen & Preise',
      subtitle:
        'Jede Behandlung wird individuell auf dich abgestimmt. Nimm dir Zeit für dich selbst und erlebe eine hochwertige Schönheitspflege.',
      directBook: 'Direkt buchen',
      combos: 'Kombinationen',
      combosText: 'Gerne stelle ich dir ein individuelles Paket zusammen. Sprich mich einfach darauf an!',
      combosPrice: 'Preise für Kombinationen auf Anfrage',
      comboPills: [
        'Maniküre + Pediküre',
        'Wimpern färben + Brow shaping',
        'Peeling + Massage',
        'Full body pampering program',
      ],
      ctaTitle: 'Bereit für deine Behandlung?',
      ctaText: 'Vereinbare jetzt deinen Termin und erlebe einen Moment der Entspannung und Schönheit.',
      ctaBook: 'Termin buchen',
      ctaWhatsApp: 'Via WhatsApp buchen',
      seoTitle: 'Behandlungen & Preise',
      seoDescription:
        'Alle Behandlungen bei MERA Cosmetics: Manikuere, Pedikuere, Waxing, Wimpern & Brauen sowie Koerperbehandlungen mit transparenten Preisen in Dietikon.',
    },
    en: {
      title: 'Treatments & Prices',
      subtitle:
        'Every treatment is tailored individually to you. Take time for yourself and enjoy high-quality beauty care.',
      directBook: 'Book Directly',
      combos: 'Combinations',
      combosText: 'I am happy to create an individual package for you. Just ask me about it!',
      combosPrice: 'Combination prices on request',
      comboPills: [
        'Manicure + Pedicure',
        'Lash tinting + Brow shaping',
        'Peeling + Massage',
        'Full body pampering program',
      ],
      ctaTitle: 'Ready for your treatment?',
      ctaText: 'Book your appointment now and experience a moment of relaxation and beauty.',
      ctaBook: 'Book appointment',
      ctaWhatsApp: 'Book via WhatsApp',
      seoTitle: 'Treatments & Prices',
      seoDescription:
        'All treatments at MERA Cosmetics: manicure, pedicure, waxing, lashes & brows, and body treatments with transparent pricing in Dietikon.',
    },
    gr: {
      title: 'Θεραπείες & Τιμές',
      subtitle:
        'Κάθε θεραπεία προσαρμόζεται προσωπικά σε εσένα. Πάρε χρόνο για τον εαυτό σου και απόλαυσε φροντίδα υψηλής ποιότητας.',
      directBook: 'Άμεση Κράτηση',
      combos: 'Συνδυασμοί',
      combosText: 'Μπορώ να δημιουργήσω ένα εξατομικευμένο πακέτο για εσένα. Απλώς ρώτησέ με!',
      combosPrice: 'Τιμές συνδυασμών κατόπιν αιτήματος',
      comboPills: [
        'Μανικιούρ + Πεντικιούρ',
        'Βαφή βλεφαρίδων + Σχηματισμός φρυδιών',
        'Peeling + Μασάζ',
        'Πρόγραμμα πλήρους περιποίησης σώματος',
      ],
      ctaTitle: 'Έτοιμη για τη θεραπεία σου;',
      ctaText: 'Κλείσε τώρα το ραντεβού σου και ζήσε μια στιγμή χαλάρωσης και ομορφιάς.',
      ctaBook: 'Κλείσε ραντεβού',
      ctaWhatsApp: 'Κλείσε μέσω WhatsApp',
      seoTitle: 'Θεραπείες & Τιμές',
      seoDescription:
        'Όλες οι θεραπείες της MERA Cosmetics: μανικιούρ, πεντικιούρ, αποτρίχωση, βλεφαρίδες & φρύδια και θεραπείες σώματος με καθαρές τιμές στο Dietikon.',
    },
  }[locale]

  function tr(value) {
    if (typeof value === 'string') return value
    return value?.[locale] ?? value?.de ?? ''
  }

  const visibleGroups = useMemo(() => {
    if (activeFilter === 'all') return TREATMENT_GROUPS
    return TREATMENT_GROUPS.filter((group) => group.id === activeFilter)
  }, [activeFilter])

  const isAllCategories = activeFilter === 'all'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-treatments-intro]', {
        autoAlpha: 0,
        y: 22,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.05,
      })

      gsap.utils.toArray('[data-treatments-scroll]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })

      gsap.fromTo(
        '[data-treatments-block]',
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.82,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-treatments-list-wrap]',
            start: 'top 88%',
            once: true,
          },
        },
      )
    }, rootRef)

    return () => ctx.revert()
  }, [locale])

  useEffect(() => {
    if (!listRef.current) return
    const wrap = listRef.current
    const cards = wrap.querySelectorAll('[data-service-card]')

    gsap.killTweensOf([wrap, ...cards])
    gsap.set(wrap, { filter: 'none' })
    cards.forEach((card) => gsap.set(card, { filter: 'none' }))

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(wrap, { filter: 'none', clearProps: 'filter' })
        cards.forEach((card) => gsap.set(card, { clearProps: 'filter' }))
      },
    })

    tl.fromTo(
      wrap,
      { autoAlpha: 0, y: 36, filter: 'blur(12px)', scale: 0.99 },
      {
        autoAlpha: 1,
        y: 0,
        filter: 'none',
        scale: 1,
        duration: 0.58,
        ease: 'power3.out',
      },
    )
    tl.fromTo(
      cards,
      { autoAlpha: 0, y: 22, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.52,
        stagger: 0.065,
        ease: 'power3.out',
      },
      '-=0.38',
    )

    return () => {
      tl.kill()
      gsap.set(wrap, { autoAlpha: 1, y: 0, scale: 1, filter: 'none', clearProps: 'filter,transform' })
      wrap.querySelectorAll('[data-service-card]').forEach((card) => {
        gsap.set(card, { autoAlpha: 1, y: 0, scale: 1, clearProps: 'filter,transform' })
      })
    }
  }, [activeFilter, locale])

  function handleFilterChange(nextFilter) {
    if (nextFilter === activeFilter) return
    if (!listRef.current) {
      setActiveFilter(nextFilter)
      return
    }

    if (filterTransitionRef.current) {
      filterTransitionRef.current.kill()
      filterTransitionRef.current = null
      const list = listRef.current
      if (list) {
        gsap.set(list, { autoAlpha: 1, y: 0, scale: 1, filter: 'none', clearProps: 'filter' })
        list.querySelectorAll('[data-service-card]').forEach((node) => {
          gsap.set(node, { autoAlpha: 1, y: 0, scale: 1, filter: 'none', clearProps: 'filter' })
        })
        list.querySelectorAll('[data-treatments-block]').forEach((node) => {
          gsap.set(node, { autoAlpha: 1, y: 0, filter: 'none', clearProps: 'filter' })
        })
      }
    }

    const outgoingCards = listRef.current.querySelectorAll('[data-service-card]')
    const outgoingHeadings = listRef.current.querySelectorAll('[data-treatments-block]')

    const transition = gsap.timeline({
      defaults: { ease: 'power3.in' },
      onComplete: () => {
        const list = listRef.current
        if (list) {
          gsap.set(list, { filter: 'none', clearProps: 'filter' })
        }
        setActiveFilter(nextFilter)
        filterTransitionRef.current = null
      },
    })

    transition.to(outgoingHeadings, {
      autoAlpha: 0,
      y: -14,
      filter: 'blur(6px)',
      duration: 0.32,
      stagger: 0.025,
    })
    transition.to(
      outgoingCards,
      {
        autoAlpha: 0,
        y: -18,
        scale: 0.985,
        filter: 'blur(8px)',
        duration: 0.34,
        stagger: 0.035,
      },
      '<0.04',
    )
    transition.to(
      listRef.current,
      {
        autoAlpha: 0,
        y: -12,
        filter: 'blur(10px)',
        duration: 0.28,
      },
      '<0.06',
    )

    filterTransitionRef.current = transition
  }

  useLayoutEffect(() => {
    positionTabIndicator(highlightedFilter, { withDrop: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only sync indicator on locale (label widths); clicks use positionTabIndicator(..., { withDrop: true })
  }, [locale, positionTabIndicator])

  return (
    <main ref={rootRef} className="pt-[86px] lg:pt-[94px] bg-[#FDFBF8] min-h-screen">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path="/behandlungen"
        lang={locale}
        keywords={SEO_KEYWORDS}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'MERA Cosmetics Behandlungen',
          provider: {
            '@type': 'BeautySalon',
            name: 'MERA Cosmetics',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Staffelackerstrasse 11',
              postalCode: '8953',
              addressLocality: 'Dietikon',
              addressCountry: 'CH',
            },
          },
          areaServed: 'Dietikon, Schweiz',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Behandlungen und Preise',
            itemListElement: TREATMENT_GROUPS.flatMap((group) => {
              if (group.sections) {
                return group.sections.flatMap((section) =>
                  section.items.map((item) => ({
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: `${tr(group.category)} - ${tr(section.name)} - ${tr(item.name)}`,
                    },
                    price: item.price.replace('CHF ', ''),
                    priceCurrency: 'CHF',
                  })),
                )
              }

              return group.items.map((item) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: `${tr(group.category)} - ${tr(item.name)}`,
                },
                price: item.price.replace('CHF ', ''),
                priceCurrency: 'CHF',
              }))
            }),
          },
        }}
      />
      <section className="px-5 lg:px-12 pt-10 pb-7 lg:pt-12 lg:pb-8 border-b border-[#4A3F35]/8">
        <div className="max-w-6xl mx-auto text-center">
          <SplitLetters
            text={copy.title}
            as="h1"
            immediate
            className="type-title font-serif text-[#4A3F35]"
          />
          <p data-treatments-intro className="mt-3 type-text text-[#7A6F65] max-w-3xl mx-auto">
            {copy.subtitle}
          </p>
        </div>
      </section>

      <section className="sticky top-[63px] lg:top-[71px] z-30 border-y border-[#4A3F35]/10 bg-[#FDFBF8]">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12 py-4 overflow-x-auto no-scrollbar">
          <div className="flex min-w-max justify-center">
            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Kategorien"
              className="relative inline-flex min-w-max items-center gap-8 lg:gap-11"
            >
              {CATEGORY_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  ref={(element) => {
                    tabRefs.current[filter.value] = element
                  }}
                  type="button"
                  role="tab"
                  aria-selected={highlightedFilter === filter.value}
                  aria-pressed={highlightedFilter === filter.value}
                  onClick={() => {
                    if (filter.value === highlightedFilter) return
                    setHighlightedFilter(filter.value)
                    const btn = tabRefs.current[filter.value]
                    if (btn) {
                      gsap.killTweensOf(btn)
                      gsap
                        .timeline()
                        .to(btn, { scale: 0.94, duration: 0.11, ease: 'power2.in' })
                        .to(btn, { scale: 1, duration: 0.26, ease: 'back.out(1.85)' })
                    }
                    positionTabIndicator(filter.value, { withDrop: true })
                    handleFilterChange(filter.value)
                  }}
                  className={`whitespace-nowrap relative pb-2 type-ui uppercase transition-all duration-300 hover:-translate-y-px ${
                    highlightedFilter === filter.value
                      ? 'text-[#4A3F35] font-medium'
                      : 'text-[#7A6F65] hover:text-[#5C4A3A]'
                  }`}
                >
                  {tr(filter.label)}
                </button>
              ))}
              <span
                ref={tabIndicatorRef}
                className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-[#9E9388] opacity-0"
              ></span>
            </div>
          </div>
        </div>
      </section>

      <section data-treatments-list-wrap className="px-5 lg:px-12 py-8 lg:py-10">
        <div ref={listRef} className={`${TREATMENTS_COLUMN_CLASS} space-y-8 min-h-[44vh]`}>
          {visibleGroups.map((group) => (
            <GroupBlock
              key={group.id}
              group={{
                ...group,
                category: tr(group.category),
                items: group.items?.map((item) => ({
                  ...item,
                  name: tr(item.name),
                  duration: tr(item.duration),
                })),
                sections: group.sections?.map((section) => ({
                  ...section,
                  name: tr(section.name),
                  items: section.items.map((item) => ({
                    ...item,
                    name: tr(item.name),
                    duration: tr(item.duration),
                  })),
                })),
              }}
              showGroupTitle={isAllCategories}
              shouldAnimate={isAllCategories}
              directBookLabel={copy.directBook}
            />
          ))}
        </div>
      </section>

      <section className="px-5 lg:px-12 pb-16 lg:pb-24">
        <div className={`${TREATMENTS_COLUMN_CLASS} text-center`}>
          <SplitLetters text={copy.combos} as="h2" className="type-title font-serif text-[#4A3F35]" />
          <span className="mt-3 inline-block h-px w-16 bg-[#4A3F35]/20"></span>

          <div
            data-treatments-scroll
            className="mt-7 relative isolate min-h-[min(56vh,480px)] md:min-h-[min(52vh,520px)] rounded-[1.7rem] border border-[#4A3F35]/8 bg-[#FAF6EF] px-6 pt-12 pb-28 sm:px-8 sm:pt-14 sm:pb-32 md:px-10 md:pt-16 md:pb-36 lg:pb-40 shadow-[0_18px_40px_rgba(74,63,53,0.11)] overflow-visible flex flex-col justify-center"
          >
            <img
              src={meraLogoWatermark}
              alt=""
              width={220}
              height={220}
              className="pointer-events-none absolute left-2 bottom-3 sm:left-3 sm:bottom-4 h-[min(28vw,7.5rem)] sm:h-[min(26vw,8.5rem)] md:h-36 w-auto object-contain object-left-bottom opacity-[0.22] select-none"
              aria-hidden="true"
            />

            <p className="type-subtitle text-[#5E5349] font-serif italic mx-auto relative z-[1]">
              {copy.combosText}
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full relative z-[1]">
              {copy.comboPills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3.5 type-ui text-[#4A3F35] shadow-[0_3px_12px_rgba(74,63,53,0.08)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(74,63,53,0.12)]"
                >
                  {pill}
                </span>
              ))}
            </div>

            <p className="mt-12 type-ui uppercase text-[#6B5540] font-medium relative z-[1]">
              {copy.combosPrice}
            </p>
          </div>

          <div className="mt-14 lg:mt-20 pt-10 lg:pt-14 pb-4 border-t border-[#4A3F35]/10">
            <SplitLetters
              text={copy.ctaTitle}
              as="h3"
              className="type-subtitle font-serif text-[#4A3F35]"
            />
            <p className="mt-4 type-text text-[#5E5349] max-w-xl mx-auto">{copy.ctaText}</p>
            <div data-treatments-scroll className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mera-pill inline-flex items-center justify-center rounded-full bg-[#8B7355] px-8 py-2.5 type-ui uppercase text-white hover:bg-[#6B5540] transition-all shadow-[0_10px_28px_rgba(74,63,53,0.18)] hover:-translate-y-0.5"
            >
              {copy.ctaBook}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#26D366]/55 px-8 py-2.5 type-ui uppercase text-[#26D366] hover:bg-[#26D366]/6 transition-all shadow-[0_10px_28px_rgba(38,211,102,0.15)] hover:-translate-y-0.5"
            >
              {copy.ctaWhatsApp}
            </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TreatmentsPage
