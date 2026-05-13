import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { bookingUrl, whatsappUrl } from '../constants/siteData'
import Seo from '../components/seo/Seo'
import { SplitLetters } from '../components/animations/SplitLetters'
import meraLogoWatermark from '../assets/Logo.jpeg'

gsap.registerPlugin(ScrollTrigger)

const FRESHA_SERVICE_BASE =
  'https://www.fresha.com/a/mera-cosmetics-by-viviane-rovito-zurich-stampfenbachstrasse-151-hh1nrtim/booking?menu=true&share=true&pId=2775917&dppub=true&employeeId=5075365'
const FRESHA_SELECTED_ITEMS_STORAGE_KEY = 'mera.fresha.selectedOfferItems'

function freshaServiceUrl(variantId) {
  return `${FRESHA_SERVICE_BASE}&offerItems=${encodeURIComponent(`sv:${variantId}`)}`
}

function extractVariantIdFromBookingLink(url) {
  if (!url) return ''
  const decoded = decodeURIComponent(url)
  const match = decoded.match(/offerItems=sv:(\d+)/)
  return match ? match[1] : ''
}

function buildFreshaCombinedUrl(variantIds) {
  if (!variantIds.length) return FRESHA_SERVICE_BASE
  const offerItems = variantIds.map((id) => `sv:${id}`).join(',')
  return `${FRESHA_SERVICE_BASE}&offerItems=${encodeURIComponent(offerItems)}`
}

const CATEGORY_FILTERS = [
  { value: 'all', label: { de: 'ALLE', en: 'ALL', gr: 'ΟΛΑ' } },
  { value: 'facecare', label: { de: 'GESICHTSPFLEGE', en: 'FACIAL CARE', gr: 'ΠΕΡΙΠΟΙΗΣΗ ΠΡΟΣΩΠΟΥ' } },
  { value: 'mani-pedi', label: { de: 'MANIKÜRE UND PEDIKÜRE', en: 'MANICURE AND PEDICURE', gr: 'ΜΑΝΙΚΙΟΥΡ ΚΑΙ ΠΕΝΤΙΚΙΟΥΡ' } },
  { value: 'waxing', label: { de: 'WAXING', en: 'WAXING', gr: 'ΑΠΟΤΡΙΧΩΣΗ' } },
  { value: 'lashes-brows', label: { de: 'WIMPERN & BRAUEN', en: 'LASHES & BROWS', gr: 'ΒΛΕΦΑΡΙΔΕΣ & ΦΡΥΔΙΑ' } },
  { value: 'relaxation', label: { de: 'ENTSPANNUNG', en: 'RELAXATION', gr: 'ΧΑΛΑΡΩΣΗ' } },
  { value: 'abo', label: { de: 'ABO', en: 'ABO', gr: 'ABO' } },
]

const TREATMENT_GROUPS = [
  {
    id: 'facecare',
    category: { de: 'Gesichtspflege', en: 'Facial Care', gr: 'Περιποίηση προσώπου' },
    items: [
      { name: 'Advanced Repair & Lifting', duration: '1 hr, 30 min', price: 'CHF 155', bookingLink: freshaServiceUrl('27478007') },
      { name: 'Timeless Alpine Booster', duration: '1 hr, 30 min', price: 'CHF 145', bookingLink: freshaServiceUrl('27477983') },
      { name: 'Timeless Alpine Boost - Express (30min.)', duration: '45 min', price: 'CHF 95', bookingLink: freshaServiceUrl('27477961') },
      { name: 'Pollution Defense Detox & Antistress', duration: '1 hr', price: 'CHF 120', bookingLink: freshaServiceUrl('27477936') },
      {
        name: 'Pollution Defense Detox & Antistress- Express (30min.)',
        duration: '45 min',
        price: 'CHF 85',
        bookingLink: freshaServiceUrl('27477918'),
      },
      { name: 'Glacial Hydration Moisture Infusing Treatment', duration: '1 hr', price: 'CHF 110', bookingLink: freshaServiceUrl('27477896') },
      {
        name: 'Glacial Hydration Refresh & Moisturizer - Express (30min.)',
        duration: '45 min',
        price: 'CHF 75',
        bookingLink: freshaServiceUrl('27477859'),
      },
    ],
  },
  {
    id: 'mani-pedi',
    category: { de: 'Maniküre und Pediküre', en: 'Manicure and Pedicure', gr: 'Μανικιούρ και Πεντικιούρ' },
    items: [
      { name: 'Gellack Maniküre', duration: '1 hr, 15 min', price: 'CHF 85', bookingLink: freshaServiceUrl('26310941') },
      { name: 'Gellack Pediküre', duration: '1 hr, 20 min', price: 'CHF 95', bookingLink: freshaServiceUrl('26310957') },
      { name: 'Maniküre mit Nagellack', duration: '1 hr', price: 'CHF 75', bookingLink: freshaServiceUrl('26310938') },
      { name: 'Pediküre mit Nagellack', duration: '1 hr, 15 min', price: 'CHF 85', bookingLink: freshaServiceUrl('26310961') },
      { name: 'Basis Maniküre', duration: '50 min', price: 'CHF 65', bookingLink: freshaServiceUrl('26310935') },
      { name: 'Basis Pediküre', duration: '1 hr', price: 'CHF 75', bookingLink: freshaServiceUrl('26310951') },
    ],
  },
  {
    id: 'waxing',
    category: { de: 'Waxing', en: 'Waxing', gr: 'Αποτρίχωση' },
    items: [
      { name: 'Waxing - Ganze Beine', duration: '45 min', price: 'CHF 95', bookingLink: freshaServiceUrl('26310966') },
      { name: 'Waxing - Halbe Beine', duration: '30 min', price: 'CHF 65', bookingLink: freshaServiceUrl('26310972') },
      { name: 'Waxing - Ganze Arme', duration: '30 min', price: 'CHF 65', bookingLink: freshaServiceUrl('26310977') },
      { name: 'Waxing - Halbe Arme', duration: '20 min', price: 'CHF 35', bookingLink: freshaServiceUrl('26310983') },
      { name: 'Waxing - Ganze Vorderseite', duration: '45 min', price: 'CHF 60', bookingLink: freshaServiceUrl('26311060') },
      { name: 'Waxing - Bauch', duration: '30 min', price: 'CHF 40', bookingLink: freshaServiceUrl('26311052') },
      { name: 'Waxing - Brust', duration: '20 min', price: 'CHF 30', bookingLink: freshaServiceUrl('26311041') },
      { name: 'Waxing - Schultern', duration: '15 min', price: 'CHF 25', bookingLink: freshaServiceUrl('26311036') },
      { name: 'Waxing - Ganzer Rücken', duration: '45 min', price: 'CHF 65', bookingLink: freshaServiceUrl('26311034') },
      { name: 'Waxing - Halber Rücken', duration: '30 min', price: 'CHF 55', bookingLink: freshaServiceUrl('26311029') },
      { name: 'Waxing - Ganzes Gesicht', duration: '1 hr', price: 'CHF 50', bookingLink: freshaServiceUrl('26311027') },
      { name: 'Waxing - Halbes Gesicht', duration: '45 min', price: 'CHF 35', bookingLink: freshaServiceUrl('26311023') },
      { name: 'Waxing - Kinn', duration: '15 min', price: 'CHF 15', bookingLink: freshaServiceUrl('26311019') },
      { name: 'Waxing - Oberlippe', duration: '15 min', price: 'CHF 15', bookingLink: freshaServiceUrl('26311014') },
      { name: 'Waxing - Achseln', duration: '30 min', price: 'CHF 45', bookingLink: freshaServiceUrl('26310995') },
      { name: 'Waxing - Bikinizone', duration: '20 min', price: 'CHF 45', bookingLink: freshaServiceUrl('26310987') },
      { name: 'Waxing - Brazilian', duration: '1 hr', price: 'CHF 85', bookingLink: freshaServiceUrl('26310993') },
    ],
  },
  {
    id: 'lashes-brows',
    category: { de: 'Wimpern & Brauen', en: 'Lashes & Brows', gr: 'Βλεφαρίδες & Φρύδια' },
    items: [
      { name: 'Augenbrauen Waxen & formen', duration: '30 min', price: 'CHF 35', bookingLink: freshaServiceUrl('27478319') },
      { name: 'Wimpernlifting', duration: '1 hr', price: 'CHF 95', bookingLink: freshaServiceUrl('26311075') },
      { name: 'Augenbrauen waxen ink. Färben', duration: '45 min', price: 'CHF 45', bookingLink: freshaServiceUrl('26311073') },
      { name: 'Augenbrauen färben', duration: '20 min', price: 'CHF 20', bookingLink: freshaServiceUrl('26311067') },
      { name: 'Wimpern färben', duration: '20 min', price: 'CHF 20', bookingLink: freshaServiceUrl('26311065') },
    ],
  },
  {
    id: 'relaxation',
    category: { de: 'Entspannung', en: 'Relaxation', gr: 'Χαλάρωση' },
    items: [
      { name: 'Rückenmassage', duration: '30 min', price: 'from CHF 75', bookingLink: freshaServiceUrl('26311100') },
      { name: 'Ganzkörper Massage', duration: '1 hr', price: 'from CHF 140', bookingLink: freshaServiceUrl('26311109') },
    ],
  },
  {
    id: 'abo',
    category: { de: 'ABO', en: 'ABO', gr: 'ABO' },
    groupIntro: "Package/Kur ABO's - ANGEBOT KAUFEN",
    items: [
      {
        name: 'Glacial Hydration Moisture Infusing Treatment Package',
        disableBooking: true,
        priceLines: ['Express: CHF 191.25 STATT CHF 225', 'Full: CHF 280.50 STATT CHF 330'],
        details: [
          'Die Glacial Hydration Refresh & Moisturize-Kur ist eine Kombination aus drei Behandlungen, die idealerweise innerhalb von drei Wochen durchgeführt werden sollten (oder für einen Intensiv-Kick drei Behandlungen pro Woche).',
          'Um die sichtbaren Ergebnisse dieser Gesichtsbehandlung aufrechtzuerhalten, umfasst die Kur alle vier Produkte der Glacial Hydration Line für die Behandlung zu Hause.',
        ],
      },
      {
        name: 'Pollution Defense Detox & Antistress Package',
        disableBooking: true,
        priceLines: ['Express: CHF 216.75 STATT CHF 255', 'Full: CHF 306 STATT CHF 360'],
        details: [
          'Die Pollution Defense Detox & Antistress-Kur ist eine Kombination aus drei Behandlungen, die idealerweise innerhalb von drei Wochen durchgeführt werden.',
          'Um die sichtbaren Ergebnisse dieser Gesichtsbehandlung aufrechtzuerhalten, umfasst die Kur alle fünf Produkte der Pollution Defense Line für die Behandlung zu Hause.',
        ],
      },
      {
        name: 'Timeless Alpine Booster Package',
        disableBooking: true,
        priceLines: ['Express: CHF 242.25 STATT CHF 285', 'Full: CHF 369.75 STATT CHF 435'],
        details: [
          'Die Timeless Alpine Booster Kur ist für jeden Hauttyp und jedes Alter geeignet. Für müde Haut in Rekonvaleszenz oder Stress, trockene und reife Haut, die gestrafft oder regeneriert werden muss.',
          'Die Kur besteht aus drei Behandlungen, die wöchentlich innerhalb von drei Wochen durchgeführt werden sollten.',
          'Die Kur umfasst die fünf Basisprodukte für eine einfache Behandlung zu Hause, um das optimale Ergebnis zu erhalten. Für beste Ergebnisse mindestens zwei Mal pro Jahr.',
        ],
      },
      {
        name: 'Advanced Repair & Lifting Package',
        disableBooking: true,
        priceLines: ['Full: CHF 395.25 STATT CHF 465'],
        details: [
          'Die Advanced Repair & Lifting Kur ist eine Kombination von drei Behandlungen, welche idealerweise während drei Wochen angewendet werden sollte. Für einen intensiven Kick für die Haut sind drei Behandlungen während einer Woche empfohlen.',
          'Um die erstaunlichen Ergebnisse dieser Gesichtsbehandlung aufrechtzuhalten, enthält dieses Package je ein The g-D Serum und The Mask & Luxury Night Cream für die Behandlung zu Hause - für ein noch intensiveres Ergebnis.',
        ],
      },
    ],
  },
]

const SEO_KEYWORDS =
  'Behandlungen Zürich, Preise Kosmetik, Manikuere, Pedikuere, Waxing, Wimpern faerben, Augenbrauen, Wimpernlifting, Rueckenmassage, Ganzkoerper Massage'

const TREATMENTS_COLUMN_CLASS = 'w-full max-w-md sm:max-w-lg mx-auto'
const EASE_OUT_SOFT = [0.22, 1, 0.36, 1]

const comboCardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, ease: EASE_OUT_SOFT, staggerChildren: 0.08, delayChildren: 0.08 },
  },
}

const comboItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.46, ease: EASE_OUT_SOFT } },
}

const comboHeadingVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE_OUT_SOFT } },
}

function parseStructuredPrice(priceLabel) {
  const match = String(priceLabel).replace(',', '.').match(/(\d+(?:\.\d+)?)/)
  return match ? match[1] : '0'
}

const SERVICE_NAME_TRANSLATIONS = {
  'Advanced Repair & Lifting': {
    en: 'Advanced Repair & Lifting',
    gr: 'Advanced Repair & Lifting',
  },
  'Timeless Alpine Booster': {
    en: 'Timeless Alpine Booster',
    gr: 'Timeless Alpine Booster',
  },
  'Timeless Alpine Boost - Express (30min.)': {
    en: 'Timeless Alpine Boost - Express (30min.)',
    gr: 'Timeless Alpine Boost - Express (30min.)',
  },
  'Pollution Defense Detox & Antistress': {
    en: 'Pollution Defense Detox & Antistress',
    gr: 'Pollution Defense Detox & Antistress',
  },
  'Pollution Defense Detox & Antistress- Express (30min.)': {
    en: 'Pollution Defense Detox & Antistress - Express (30min.)',
    gr: 'Pollution Defense Detox & Antistress - Express (30min.)',
  },
  'Glacial Hydration Moisture Infusing Treatment': {
    en: 'Glacial Hydration Moisture Infusing Treatment',
    gr: 'Glacial Hydration Moisture Infusing Treatment',
  },
  'Glacial Hydration Refresh & Moisturizer - Express (30min.)': {
    en: 'Glacial Hydration Refresh & Moisturizer - Express (30min.)',
    gr: 'Glacial Hydration Refresh & Moisturizer - Express (30min.)',
  },
  'Gellack Maniküre': { en: 'Gel Polish Manicure', gr: 'Μανικιούρ με gel' },
  'Gellack Pediküre': { en: 'Gel Polish Pedicure', gr: 'Πεντικιούρ με gel' },
  'Maniküre mit Nagellack': { en: 'Manicure with Nail Polish', gr: 'Μανικιούρ με βερνίκι' },
  'Pediküre mit Nagellack': { en: 'Pedicure with Nail Polish', gr: 'Πεντικιούρ με βερνίκι' },
  'Basis Maniküre': { en: 'Basic Manicure', gr: 'Βασικό Μανικιούρ' },
  'Basis Pediküre': { en: 'Basic Pedicure', gr: 'Βασικό Πεντικιούρ' },
  'Augenbrauen Waxen & formen': { en: 'Eyebrow Waxing & Shaping', gr: 'Αποτρίχωση και σχήμα φρυδιών' },
  Wimpernlifting: { en: 'Lash Lifting', gr: 'Ανόρθωση βλεφαρίδων' },
  'Augenbrauen waxen ink. Färben': { en: 'Eyebrow Waxing incl. Tinting', gr: 'Αποτρίχωση φρυδιών με βαφή' },
  'Augenbrauen färben': { en: 'Eyebrow Tinting', gr: 'Βαφή φρυδιών' },
  'Wimpern färben': { en: 'Lash Tinting', gr: 'Βαφή βλεφαρίδων' },
  Rückenmassage: { en: 'Back Massage', gr: 'Μασάζ πλάτης' },
  'Ganzkörper Massage': { en: 'Full Body Massage', gr: 'Μασάζ ολόκληρου σώματος' },
}

const WAXING_SEGMENT_TRANSLATIONS = {
  'Ganze Beine': { en: 'Full Legs', gr: 'Ολόκληρα πόδια' },
  'Halbe Beine': { en: 'Half Legs', gr: 'Μισά πόδια' },
  'Ganze Arme': { en: 'Full Arms', gr: 'Ολόκληρα χέρια' },
  'Halbe Arme': { en: 'Half Arms', gr: 'Μισά χέρια' },
  'Ganze Vorderseite': { en: 'Full Front Side', gr: 'Ολόκληρη μπροστινή πλευρά' },
  Bauch: { en: 'Stomach', gr: 'Κοιλιά' },
  Brust: { en: 'Chest', gr: 'Στήθος' },
  Schultern: { en: 'Shoulders', gr: 'Ώμοι' },
  'Ganzer Rücken': { en: 'Full Back', gr: 'Ολόκληρη πλάτη' },
  'Halber Rücken': { en: 'Half Back', gr: 'Μισή πλάτη' },
  'Ganzes Gesicht': { en: 'Full Face', gr: 'Ολόκληρο πρόσωπο' },
  'Halbes Gesicht': { en: 'Half Face', gr: 'Μισό πρόσωπο' },
  Kinn: { en: 'Chin', gr: 'Πηγούνι' },
  Oberlippe: { en: 'Upper Lip', gr: 'Άνω χείλος' },
  Achseln: { en: 'Underarms', gr: 'Μασχάλες' },
  Bikinizone: { en: 'Bikini Line', gr: 'Γραμμή μπικίνι' },
  Brazilian: { en: 'Brazilian', gr: 'Brazilian' },
}

function translateServiceName(name, locale) {
  if (locale === 'de') return name

  if (name.startsWith('Waxing - ')) {
    const segment = name.replace('Waxing - ', '')
    const translatedSegment = WAXING_SEGMENT_TRANSLATIONS[segment]?.[locale] || segment
    if (locale === 'en') return `Waxing - ${translatedSegment}`
    if (locale === 'gr') return `Αποτρίχωση - ${translatedSegment}`
  }

  return SERVICE_NAME_TRANSLATIONS[name]?.[locale] || name
}

function ServiceListRow({ item, directBookLabel, onDirectBookClick, isLast }) {
  const hasBooking = !item.disableBooking && Boolean(item.bookingVariantId || item.effectiveBookingLink)
  const hasDetails = Array.isArray(item.details) && item.details.length > 0
  const hasPriceLines = Array.isArray(item.priceLines) && item.priceLines.length > 0

  return (
    <article
      className={`group px-4 md:px-6 lg:px-9 py-4 md:py-5 transition-all duration-300 hover:bg-[#FCF8F2] ${isLast ? '' : 'border-b border-[#4A3F35]/8'}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h4 className="font-sans text-[1rem] font-medium leading-[1.25] tracking-[0.005em] text-[#4A3F35] transition-colors duration-300 group-hover:text-[#6D5C48] md:text-[1.04rem]">
            {item.name}
          </h4>
          {item.duration ? (
            <p className="font-sans text-[0.66rem] font-medium uppercase tracking-[0.12em] text-[#7A6F65]">
              {item.duration}
            </p>
          ) : null}
          {hasPriceLines ? (
            <div className="space-y-1.5 pt-1">
              {item.priceLines.map((line, index) => (
                <p
                  key={`${item.name}-price-line-${index}`}
                  className="tabular-nums font-sans text-[0.95rem] font-semibold leading-tight tracking-[0.01em] text-[#5C4A3A]"
                >
                  {line}
                </p>
              ))}
            </div>
          ) : null}
          {hasDetails ? (
            <ul className="space-y-2 pt-2 text-[0.86rem] leading-relaxed text-[#6F645A]">
              {item.details.map((detail, index) => (
                <li key={`${item.name}-detail-${index}`} className="flex items-start gap-2">
                  <span className="mt-1 block text-[#8B7355]">-</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {hasBooking ? (
          <div className="flex shrink-0 items-center justify-end gap-3 md:min-w-[245px] md:gap-5">
            <span className="shrink-0 tabular-nums font-sans text-[0.95rem] font-medium leading-none tracking-[0.01em] text-[#5C4A3A] md:text-[1rem]">
              {item.price}
            </span>
            <a
              href={item.effectiveBookingLink || bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => onDirectBookClick(event, item)}
              className="btn-mera-pill inline-flex h-10 w-[136px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#7E6D52] px-4 py-2 text-center type-ui uppercase text-white transition-all duration-300 hover:bg-[#6D5D46] hover:shadow-[0_8px_20px_rgba(74,63,53,0.28)] hover:-translate-y-px active:scale-[0.98]"
            >
              {directBookLabel}
            </a>
          </div>
        ) : null}
      </div>
    </article>
  )
}

function ServiceListCard({ items, shouldAnimate = false, directBookLabel, onDirectBookClick }) {
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
          onDirectBookClick={onDirectBookClick}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  )
}

function GroupBlock({ group, showGroupTitle, shouldAnimate, directBookLabel, onDirectBookClick }) {
  return (
    <div className="space-y-4">
      {showGroupTitle && (
        <h2 data-treatments-block={shouldAnimate ? true : undefined} className="type-title font-serif text-[#4A3F35]">
          {group.category}
        </h2>
      )}
      {group.groupIntro ? (
        <p data-treatments-block={shouldAnimate ? true : undefined} className="type-ui uppercase text-[#8B7355]">
          {group.groupIntro}
        </p>
      ) : null}

      {group.sections ? (
        <div className="space-y-6">
          {group.sections.map((section) => (
            <div key={section.name} className="space-y-3">
              <h3 data-treatments-block={shouldAnimate ? true : undefined} className="type-subtitle font-serif italic text-[#5E5349]">
                {section.name}
              </h3>
              <ServiceListCard
                items={section.items}
                shouldAnimate={shouldAnimate}
                directBookLabel={directBookLabel}
                onDirectBookClick={onDirectBookClick}
              />
            </div>
          ))}
        </div>
      ) : (
        <ServiceListCard
          items={group.items}
          shouldAnimate={shouldAnimate}
          directBookLabel={directBookLabel}
          onDirectBookClick={onDirectBookClick}
        />
      )}
    </div>
  )
}

function TreatmentsPage({ language }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [highlightedFilter, setHighlightedFilter] = useState('all')
  const [selectedVariantIds, setSelectedVariantIds] = useState(() => {
    if (typeof window === 'undefined') return []
    const raw = window.localStorage.getItem(FRESHA_SELECTED_ITEMS_STORAGE_KEY)
    if (!raw) return []
    try {
      const parsed = JSON.parse(raw)
      if (!Array.isArray(parsed)) return []
      return parsed.filter((id) => /^\d+$/.test(String(id))).map(String)
    } catch {
      return []
    }
  })
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
        'Alle Behandlungen bei MERA Cosmetics: Manikuere, Pedikuere, Waxing, Wimpern & Brauen sowie Koerperbehandlungen mit transparenten Preisen in Zürich.',
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
        'All treatments at MERA Cosmetics: manicure, pedicure, waxing, lashes & brows, and body treatments with transparent pricing in Zürich.',
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
        'Όλες οι θεραπείες της MERA Cosmetics: μανικιούρ, πεντικιούρ, αποτρίχωση, βλεφαρίδες & φρύδια και θεραπείες σώματος με καθαρές τιμές στη Ζυρίχη.',
    },
  }[locale]

  function tr(value) {
    if (typeof value === 'string') return value
    return value?.[locale] ?? value?.de ?? ''
  }

  const visibleGroups = useMemo(() => {
    if (activeFilter === 'all') return TREATMENT_GROUPS
    const filteredGroups = TREATMENT_GROUPS.filter((group) => group.id === activeFilter)
    // Fail-safe: if a filter state gets out of sync, never render an empty list area.
    return filteredGroups.length ? filteredGroups : TREATMENT_GROUPS
  }, [activeFilter])

  const isAllCategories = activeFilter === 'all'

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(FRESHA_SELECTED_ITEMS_STORAGE_KEY, JSON.stringify(selectedVariantIds))
  }, [selectedVariantIds])

  function handleDirectBookClick(event, item) {
    const variantId = item.bookingVariantId
    if (!variantId) return
    event.preventDefault()
    const merged = Array.from(new Set([...selectedVariantIds, variantId]))
    setSelectedVariantIds(merged)
    const combinedUrl = buildFreshaCombinedUrl(merged)
    window.open(combinedUrl, '_blank', 'noopener,noreferrer')
  }

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

      gsap.utils.toArray('[data-treatments-gsap-scroll]').forEach((el) => {
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
              streetAddress: 'Stampfenbachstrasse 151',
              postalCode: '8006',
              addressLocality: 'Zürich',
              addressCountry: 'CH',
            },
          },
          areaServed: 'Zürich, Schweiz',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Behandlungen und Preise',
            itemListElement: TREATMENT_GROUPS.flatMap((group) => {
              if (group.sections) {
                return group.sections.flatMap((section) =>
                  section.items
                    .filter((item) => !item.disableBooking)
                    .map((item) => ({
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: `${tr(group.category)} - ${tr(section.name)} - ${tr(item.name)}`,
                    },
                    price: parseStructuredPrice(item.price),
                    priceCurrency: 'CHF',
                  })),
                )
              }

              return group.items
                .filter((item) => !item.disableBooking)
                .map((item) => ({
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: `${tr(group.category)} - ${tr(item.name)}`,
                  },
                  price: parseStructuredPrice(item.price),
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
        <div
          ref={listRef}
          className={`${TREATMENTS_COLUMN_CLASS} space-y-8 ${visibleGroups.length ? 'min-h-[44vh]' : 'min-h-0'}`}
        >
          {visibleGroups.map((group) => (
            <GroupBlock
              key={group.id}
              group={{
                ...group,
                category: tr(group.category),
                items: group.items?.map((item) => ({
                  ...item,
                  name: translateServiceName(item.name, locale),
                  duration: tr(item.duration),
                  bookingVariantId: extractVariantIdFromBookingLink(item.bookingLink),
                  effectiveBookingLink: buildFreshaCombinedUrl(
                    Array.from(
                      new Set([
                        ...selectedVariantIds,
                        extractVariantIdFromBookingLink(item.bookingLink),
                      ].filter(Boolean)),
                    ),
                  ),
                })),
                sections: group.sections?.map((section) => ({
                  ...section,
                  name: tr(section.name),
                  items: section.items.map((item) => ({
                    ...item,
                    name: translateServiceName(item.name, locale),
                    duration: tr(item.duration),
                    bookingVariantId: extractVariantIdFromBookingLink(item.bookingLink),
                    effectiveBookingLink: buildFreshaCombinedUrl(
                      Array.from(
                        new Set([
                          ...selectedVariantIds,
                          extractVariantIdFromBookingLink(item.bookingLink),
                        ].filter(Boolean)),
                      ),
                    ),
                  })),
                })),
              }}
              showGroupTitle
              shouldAnimate
              directBookLabel={copy.directBook}
              onDirectBookClick={handleDirectBookClick}
            />
          ))}
          {!visibleGroups.length && (
            <p className="type-text text-[#7A6F65] text-center py-4">{copy.combosText}</p>
          )}
        </div>
      </section>

      <section className="px-5 lg:px-12 pb-16 lg:pb-24">
        <div className={`${TREATMENTS_COLUMN_CLASS} text-center`}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            variants={comboHeadingVariants}
            className="type-title font-serif text-[#4A3F35]"
          >
            {copy.combos}
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.45, ease: EASE_OUT_SOFT, delay: 0.05 }}
            className="mt-3 inline-block h-px w-16 origin-center bg-[#4A3F35]/20"
          ></motion.span>

          <motion.div
            key={`combo-card-${locale}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.26 }}
            variants={comboCardVariants}
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

            <motion.p variants={comboItemVariants} className="type-subtitle text-[#5E5349] font-serif italic mx-auto max-w-[34ch] relative z-[1]">
              {copy.combosText}
            </motion.p>

            <motion.div
              variants={comboItemVariants}
              className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full items-stretch relative z-[1]"
            >
              {copy.comboPills.map((pill) => (
                <motion.span
                  variants={comboItemVariants}
                  key={pill}
                  className="inline-flex min-h-12 items-center justify-center text-center leading-tight rounded-full bg-white px-5 py-3.5 type-ui text-[#4A3F35] shadow-[0_3px_12px_rgba(74,63,53,0.08)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(74,63,53,0.12)] whitespace-normal break-words"
                >
                  {pill}
                </motion.span>
              ))}
            </motion.div>

            <motion.p variants={comboItemVariants} className="mt-12 type-ui uppercase text-[#6B5540] font-medium relative z-[1]">
              {copy.combosPrice}
            </motion.p>
          </motion.div>

          <div className="mt-14 lg:mt-20 pt-10 lg:pt-14 pb-4 border-t border-[#4A3F35]/10">
            <SplitLetters
              text={copy.ctaTitle}
              as="h3"
              className="type-subtitle font-serif text-[#4A3F35]"
            />
            <p className="mt-4 type-text text-[#5E5349] max-w-xl mx-auto">{copy.ctaText}</p>
            <div data-treatments-gsap-scroll className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
