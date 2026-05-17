import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Seo from '../components/seo/Seo'
import { bookingUrl, whatsappUrl } from '../constants/siteData'
import fadedLogo from '../assets/Logo.jpeg'
import pro1Image from '../assets/pro1.jpg'
import pro2Image from '../assets/pro2.jpg'
import pro3Image from '../assets/pro3.jpg'
import pro4Image from '../assets/pro4.jpg'

gsap.registerPlugin(ScrollTrigger)

const PRODUCT_IMAGE_PATHS = {
  glacial: pro1Image,
  cellpower: pro2Image,
  alpine: pro3Image,
  pollution: pro4Image,
}

const PRODUCTS_COPY = {
  de: {
    seoTitle: 'Produkte',
    seoDescription:
      'Produktlinien bei MERA Cosmetics: Glacial Hydration, Cellpower Experts, Alpine Radiance und Pollution Defense.',
    heroTag: 'MERA Skincare Selection',
    heroTitle: 'Produkte',
    heroLead: 'Vier ausgewählte Pflegelinien für sichtbare Ergebnisse und nachhaltige Hautgesundheit.',
    heroSub:
      'Von intensiver Feuchtigkeit über Detox bis zu Anti-Aging: jede Linie wird professionell auf Ihren Hautzustand abgestimmt, damit Wirkung und Wohlgefühl langfristig erhalten bleiben.',
    chips: ['Hydration', 'Anti-Aging', 'Detox & Repair'],
    imageMissing: 'Produktbild wird hinzugefügt',
    imageView: 'View',
    imageAria: 'vergrößern',
    lightboxClose: 'Close',
    seoBlockTitle: 'Professionelle Beauty-Produkte für nachhaltige Hautgesundheit',
    seoBlockP1:
      'Bei MERA Cosmetics in Zürich arbeiten wir mit ausgewählten Wirkstofflinien für Feuchtigkeit, Anti-Aging, Detox und Hautschutz. Jede Behandlung wird auf Ihren Hautzustand abgestimmt, damit sichtbare Ergebnisse und ein natürlich strahlendes Hautbild langfristig erhalten bleiben.',
    seoBlockP2:
      'Vereinbaren Sie Ihren Termin für eine individuelle Hautanalyse und lassen Sie sich professionell beraten, welche Produktlinie und Behandlung am besten zu Ihren persönlichen Bedürfnissen passt.',
    ctaBook: 'Termin buchen',
    ctaWhatsApp: 'Via WhatsApp buchen',
    products: [
      {
        id: 'glacial',
        title: 'Glacial Hydration Refresh & Moisturize Treatment',
        subtitle: 'Glacial Hydration Line',
        body: [
          'Das Glacial Hydration Refresh & Moisturize Treatment mit den Glacial Hydration Produkten befeuchtet intensiv und belebt die Haut fühlbar und sichtbar.',
          'Die stärkenden sowie aktivierenden alpinen Wirkstoffe in hoher Konzentration fördern die Widerstandsfähigkeit der Haut, füllen Feuchtigkeitsdepots sofort und langanhaltend auf und beruhigen die Haut gleichzeitig.',
          'Die natürliche Hautbarriere sowie die Abwehrfunktion werden gestärkt, feine Trockenheitslinien minimiert und das Hautbild wirkt rosiger, frischer und ebenmässiger.',
          'Ideal für trockene und umweltbelastete Haut durch Sonne, Kälte und sportliche Aktivitäten - oder als Frische-Kick zwischendurch. Sehr geeignet für junge Haut und alle Hauttypen von Männern und Frauen.',
        ],
      },
      {
        id: 'cellpower',
        title: 'Advanced Repair & Lifting Treatment',
        subtitle: 'Cellpower Experts Line',
        body: [
          'Die Advanced Repair & Lifting Behandlung bietet einen sofortigen straffenden und verjüngenden Effekt.',
          'Hochentwickelte Anti-Aging-Inhaltsstoffe in hoher Konzentration aktivieren die Haut in der Dermis, verbessern die Hautresistenz und unterstützen die Entgiftung.',
          'Faltenzonen können reduziert werden. Die Haut wirkt gepflegt, befeuchtet, entspannt und sichtbar frischer.',
          'Geeignet für reife, anspruchsvolle und strapazierte Haut - besonders bei Umweltstress, Sonne, Kälte und Rötungen.',
        ],
      },
      {
        id: 'alpine',
        title: 'Timeless Alpine Booster Treatment',
        subtitle: 'Alpine Radiance Line',
        body: [
          'Switzerland ist eine luxuriöse Anti-Aging-Kollektion, die auf die Wiederherstellung jugendlicher Ausstrahlung und die Milderung von Mimikfalten ausgerichtet ist.',
          'Die Formeln basieren auf einer exklusiven Kombination von Pflanzenstammzellen aus den Schweizer Alpen und sorgen für einen intensiven Lifting-Effekt sowie neue Leuchtkraft.',
          'Schweizer Apfel fördert die Zellerneuerung, Gamay-Trauben schützen vor freien Radikalen und UV-bedingter Hautalterung (Photoaging), Alpenrose stärkt die Hautbarriere bei Umweltstress.',
        ],
      },
      {
        id: 'pollution',
        title: 'Pollution Defense Detox & Antistress Treatment',
        subtitle: 'Pollution Defense Line',
        body: [
          'Die Pollution Defense Detox & Antistress Behandlung mit den Pollution Defense Produkten bewirkt einen spürbaren Detox-Effekt.',
          'Entgiftende Wirkstoffe mit dem speziellen Autophagy Cell Complex aktivieren den hauteigenen Entgiftungsprozess und schützen die Haut vor Umweltverschmutzung und Stressfaktoren.',
          'Die Haut wird gestärkt, ausbalanciert und langfristig mit Feuchtigkeit versorgt. Rötungen werden gemildert, feine Linien und Fältchen reduziert.',
          'Ideal für gestresste und umweltbelastete Haut durch Sonne, Kälte und sportliche Betätigung.',
        ],
      },
    ],
  },
  en: {
    seoTitle: 'Products',
    seoDescription:
      'Product lines at MERA Cosmetics: Glacial Hydration, Cellpower Experts, Alpine Radiance and Pollution Defense.',
    heroTag: 'MERA Skincare Selection',
    heroTitle: 'Products',
    heroLead: 'Four selected skincare lines for visible results and long-term skin health.',
    heroSub:
      'From intensive hydration and detox to anti-aging support: every line is selected according to your skin condition for long-lasting results and comfort.',
    chips: ['Hydration', 'Anti-Aging', 'Detox & Repair'],
    imageMissing: 'Product image coming soon',
    imageView: 'View',
    imageAria: 'enlarge',
    lightboxClose: 'Close',
    seoBlockTitle: 'Professional Beauty Products for Long-Term Skin Health',
    seoBlockP1:
      'At MERA Cosmetics in Zurich, we work with selected active skincare lines for hydration, anti-aging, detox, and skin protection. Every treatment is tailored to your skin condition so visible and natural-looking results can be maintained over time.',
    seoBlockP2:
      'Book your appointment for a personalized skin analysis and get professional guidance on which product line and treatment best match your personal needs.',
    ctaBook: 'Book appointment',
    ctaWhatsApp: 'Book via WhatsApp',
    products: [
      {
        id: 'glacial',
        title: 'Glacial Hydration Refresh & Moisturize Treatment',
        subtitle: 'Glacial Hydration Line',
        body: [
          'The Glacial Hydration Refresh & Moisturize Treatment deeply hydrates and visibly revitalizes the skin.',
          'High-concentration alpine active ingredients improve skin resilience, refill moisture reserves immediately and over time, and soothe the skin at the same time.',
          'The natural skin barrier and defense function are strengthened, fine dryness lines are reduced, and the complexion appears rosier, fresher, and more even.',
          'Ideal for dry and environmentally stressed skin caused by sun, cold, and sports activities - or as a freshness boost in between. Suitable for young skin and all skin types for men and women.',
        ],
      },
      {
        id: 'cellpower',
        title: 'Advanced Repair & Lifting Treatment',
        subtitle: 'Cellpower Experts Line',
        body: [
          'The Advanced Repair & Lifting treatment offers an immediate firming and rejuvenating effect.',
          'High-performance anti-aging ingredients in high concentration activate the skin in the dermis, improve resistance, and support detoxification.',
          'Wrinkle zones can be reduced. The skin appears nourished, hydrated, relaxed, and visibly fresher.',
          'Suitable for mature, demanding, and stressed skin - especially in cases of environmental stress, sun exposure, cold, and redness.',
        ],
      },
      {
        id: 'alpine',
        title: 'Timeless Alpine Booster Treatment',
        subtitle: 'Alpine Radiance Line',
        body: [
          'Switzerland is a luxurious anti-aging collection focused on restoring youthful radiance and softening expression lines.',
          'The formulas are based on an exclusive combination of plant stem cells from the Swiss Alps, providing a strong lifting effect and renewed glow.',
          'Swiss apple supports cell renewal, Gamay grapes protect against free radicals and UV-induced photoaging, and alpine rose strengthens the skin barrier under environmental stress.',
        ],
      },
      {
        id: 'pollution',
        title: 'Pollution Defense Detox & Antistress Treatment',
        subtitle: 'Pollution Defense Line',
        body: [
          'The Pollution Defense Detox & Antistress treatment with Pollution Defense products delivers a noticeable detox effect.',
          'Detoxifying ingredients with the special Autophagy Cell Complex activate the skin’s natural detox process and protect the skin from environmental pollution and stress factors.',
          'The skin is strengthened, balanced, and supplied with long-lasting moisture. Redness is reduced, and fine lines and wrinkles are softened.',
          'Ideal for stressed and environmentally burdened skin due to sun, cold, and physical activity.',
        ],
      },
    ],
  },
  gr: {
    seoTitle: 'Products',
    seoDescription:
      'Σειρές προϊόντων στη MERA Cosmetics: Glacial Hydration, Cellpower Experts, Alpine Radiance και Pollution Defense.',
    heroTag: 'MERA Skincare Selection',
    heroTitle: 'Products',
    heroLead: 'Τέσσερις επιλεγμένες σειρές φροντίδας για ορατά αποτελέσματα και υγιές δέρμα.',
    heroSub:
      'Από εντατική ενυδάτωση και αποτοξίνωση έως αντιγήρανση: κάθε σειρά επιλέγεται σύμφωνα με τις ανάγκες του δέρματός σας για σταθερά και μακροχρόνια αποτελέσματα.',
    chips: ['Hydration', 'Anti-Aging', 'Detox & Repair'],
    imageMissing: 'Η εικόνα προϊόντος θα προστεθεί σύντομα',
    imageView: 'View',
    imageAria: 'μεγέθυνση',
    lightboxClose: 'Close',
    seoBlockTitle: 'Επαγγελματικά προϊόντα ομορφιάς για υγιές δέρμα',
    seoBlockP1:
      'Στη MERA Cosmetics στη Ζυρίχη χρησιμοποιούμε επιλεγμένες σειρές δραστικών συστατικών για ενυδάτωση, αντιγήρανση, αποτοξίνωση και προστασία του δέρματος. Κάθε θεραπεία προσαρμόζεται στην κατάσταση του δέρματός σας για ορατά και φυσικά αποτελέσματα που διαρκούν.',
    seoBlockP2:
      'Κλείστε ραντεβού για εξατομικευμένη ανάλυση δέρματος και επαγγελματική καθοδήγηση, ώστε να επιλέξουμε μαζί τη σωστή σειρά προϊόντων και θεραπεία για τις ανάγκες σας.',
    ctaBook: 'Κλείσε ραντεβού',
    ctaWhatsApp: 'Κλείσε μέσω WhatsApp',
    products: [
      {
        id: 'glacial',
        title: 'Glacial Hydration Refresh & Moisturize Treatment',
        subtitle: 'Glacial Hydration Line',
        body: [
          'Το Glacial Hydration Refresh & Moisturize Treatment προσφέρει εντατική ενυδάτωση και ορατή αναζωογόνηση στην επιδερμίδα.',
          'Τα ενεργά αλπικά συστατικά υψηλής συγκέντρωσης ενισχύουν την αντοχή του δέρματος, αναπληρώνουν τα αποθέματα υγρασίας άμεσα και σε βάθος χρόνου, ενώ ταυτόχρονα καταπραΰνουν.',
          'Ο φυσικός φραγμός και η αμυντική λειτουργία της επιδερμίδας ενδυναμώνονται, οι λεπτές γραμμές ξηρότητας μειώνονται και η όψη γίνεται πιο φωτεινή, φρέσκια και ομοιόμορφη.',
          'Ιδανικό για ξηρή και επιβαρυμένη επιδερμίδα από ήλιο, κρύο και αθλητική δραστηριότητα - ή ως άμεσο fresh boost. Κατάλληλο για νεανικό δέρμα και για όλους τους τύπους δέρματος ανδρών και γυναικών.',
        ],
      },
      {
        id: 'cellpower',
        title: 'Advanced Repair & Lifting Treatment',
        subtitle: 'Cellpower Experts Line',
        body: [
          'Η θεραπεία Advanced Repair & Lifting προσφέρει άμεσο αποτέλεσμα σύσφιξης και ανανέωσης.',
          'Προηγμένα αντιγηραντικά δραστικά συστατικά υψηλής συγκέντρωσης ενεργοποιούν την επιδερμίδα στο χόριο, βελτιώνουν την ανθεκτικότητα και υποστηρίζουν την αποτοξίνωση.',
          'Οι ζώνες ρυτίδων μπορούν να μειωθούν. Η επιδερμίδα δείχνει περιποιημένη, ενυδατωμένη, πιο ήρεμη και εμφανώς πιο φρέσκια.',
          'Κατάλληλη για ώριμη, απαιτητική και καταπονημένη επιδερμίδα - ειδικά σε περιπτώσεις περιβαλλοντικού στρες, ήλιου, κρύου και ερυθρότητας.',
        ],
      },
      {
        id: 'alpine',
        title: 'Timeless Alpine Booster Treatment',
        subtitle: 'Alpine Radiance Line',
        body: [
          'Η Switzerland είναι μια πολυτελής anti-aging συλλογή που εστιάζει στην επαναφορά της νεανικής λάμψης και στη μείωση των γραμμών έκφρασης.',
          'Οι φόρμουλες βασίζονται σε αποκλειστικό συνδυασμό φυτικών βλαστοκυττάρων από τις ελβετικές Άλπεις, προσφέροντας έντονο lifting effect και νέα φωτεινότητα.',
          'Το ελβετικό μήλο ενισχύει την κυτταρική ανανέωση, τα σταφύλια Gamay προστατεύουν από ελεύθερες ρίζες και UV photoaging, ενώ το αλπικό τριαντάφυλλο ενδυναμώνει τον δερματικό φραγμό σε συνθήκες περιβαλλοντικού στρες.',
        ],
      },
      {
        id: 'pollution',
        title: 'Pollution Defense Detox & Antistress Treatment',
        subtitle: 'Pollution Defense Line',
        body: [
          'Η θεραπεία Pollution Defense Detox & Antistress με τα προϊόντα Pollution Defense προσφέρει αισθητό detox αποτέλεσμα.',
          'Τα αποτοξινωτικά δραστικά συστατικά με το ειδικό Autophagy Cell Complex ενεργοποιούν τον φυσικό μηχανισμό αποτοξίνωσης του δέρματος και το προστατεύουν από ρύπανση και παράγοντες στρες.',
          'Η επιδερμίδα ενδυναμώνεται, εξισορροπείται και αποκτά μακράς διάρκειας ενυδάτωση. Η ερυθρότητα μειώνεται και οι λεπτές γραμμές και ρυτίδες απαλύνονται.',
          'Ιδανική για στρεσαρισμένη και περιβαλλοντικά επιβαρυμένη επιδερμίδα από ήλιο, κρύο και αθλητική δραστηριότητα.',
        ],
      },
    ],
  },
}

function ProductImage({ src, alt, onView, labels }) {
  const [hasError, setHasError] = useState(false)

  return (
    <div
      data-products-image-wrap
      className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-[#4A3F35]/8 bg-linear-to-br from-[#F4EFE8] to-[#E7DED3]"
    >
      {!hasError ? (
        <button
          type="button"
          onClick={() => onView(src, alt)}
          className="group block h-full w-full"
          aria-label={`${alt} ${labels.imageAria}`}
        >
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-white opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            {labels.imageView}
          </span>
        </button>
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 text-center">
          <p className="font-serif text-base italic text-[#7A6F65]">{labels.imageMissing}</p>
        </div>
      )}
    </div>
  )
}

function ProductCard({ product, onViewImage, labels }) {
  return (
    <article
      data-products-card
      className="group relative overflow-hidden rounded-3xl border border-[#4A3F35]/10 bg-white/70 p-5 shadow-[0_16px_34px_rgba(74,63,53,0.10)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#8B7355]/30 hover:shadow-[0_28px_55px_rgba(74,63,53,0.18)] lg:p-7"
    >
      <img
        src={fadedLogo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -right-8 z-0 w-28 rotate-12 select-none opacity-[0.045] transition-transform duration-[1200ms] group-hover:scale-110 lg:w-36"
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <ProductImage src={product.imageSrc} alt={product.title} onView={onViewImage} labels={labels} />
        </div>
        <div className="relative z-[1] space-y-4 lg:col-span-7">
          <h2 className="font-serif text-2xl leading-tight text-[#4A3F35] lg:text-3xl">{product.title}</h2>
          <p className="font-sans text-xs uppercase tracking-[0.14em] text-[#8B7355]">{product.subtitle}</p>
          <div className="space-y-4 text-[#6F645A]">
            {product.body.map((paragraph, idx) => (
              <p key={`${product.id}-p-${idx}`} className="text-sm leading-relaxed lg:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function ProductsPage({ language }) {
  const locale = language === 'en' || language === 'gr' ? language : 'de'
  const copy = PRODUCTS_COPY[locale]
  const rootRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-products-hero-el]', {
        autoAlpha: 0,
        y: 22,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.05,
      })

      gsap.fromTo(
        '[data-products-card]',
        { autoAlpha: 0, y: 28, scale: 0.99 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.72,
          stagger: 0.11,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-products-cards]',
            start: 'top 86%',
            once: true,
          },
        },
      )

      gsap.utils.toArray('[data-products-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [locale])

  useEffect(() => {
    if (!lightbox) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightbox(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightbox])

  const products = useMemo(
    () =>
      copy.products.map((product) => ({
        ...product,
        imageSrc: PRODUCT_IMAGE_PATHS[product.id],
      })),
    [copy],
  )

  return (
    <main ref={rootRef} className="min-h-screen bg-[#FDFBF8] pt-[86px] lg:pt-[94px]">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path="/products"
        lang={locale}
      />

      <section className="relative overflow-hidden border-b border-[#4A3F35]/8 bg-linear-to-b from-[#FAF7F2] to-[#F3ECE2]/40 px-5 pb-10 pt-10 lg:px-12 lg:pb-12 lg:pt-14">
        <img
          src={fadedLogo}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-80px] top-1/2 w-[320px] -translate-y-1/2 rotate-12 select-none opacity-[0.05] lg:right-[-30px] lg:w-[460px]"
        />
        <div className="relative mx-auto max-w-6xl text-center">
          <span data-products-hero-el className="type-ui uppercase tracking-[0.18em] text-[#8B7355]">{copy.heroTag}</span>
          <h1 data-products-hero-el className="mt-3 type-title font-serif text-[#4A3F35]">
            {copy.heroTitle}
          </h1>
          <p data-products-hero-el className="mx-auto mt-4 max-w-3xl type-text text-[#7A6F65]">{copy.heroLead}</p>
          <p data-products-hero-el className="mx-auto mt-3 max-w-3xl text-[0.82rem] leading-relaxed text-[#7A6F65]/90 lg:text-[0.9rem]">{copy.heroSub}</p>
          <div data-products-hero-el className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {copy.chips.map((chip) => (
              <span key={chip} className="rounded-full border border-[#8B7355]/25 bg-white/55 px-4 py-1.5 type-ui uppercase text-[#6F645A]">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 lg:px-12 lg:py-14">
        <div data-products-cards className="mx-auto max-w-6xl space-y-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              labels={copy}
              onViewImage={(src, alt) => setLightbox({ src, alt })}
            />
          ))}
        </div>
      </section>

      <section className="px-5 pb-16 lg:px-12 lg:pb-24">
        <div data-products-reveal className="mx-auto max-w-6xl border-t border-[#4A3F35]/10 pt-10 text-center lg:pt-14">
          <h2 className="type-subtitle font-serif text-[#4A3F35]">
            {copy.seoBlockTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl type-text text-[#6F645A]">{copy.seoBlockP1}</p>
          <p className="mx-auto mt-4 max-w-3xl type-text text-[#6F645A]">{copy.seoBlockP2}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mera-pill inline-flex items-center justify-center rounded-full bg-[#8B7355] px-8 py-2.5 type-ui uppercase text-white transition-all shadow-[0_10px_28px_rgba(74,63,53,0.18)] hover:-translate-y-0.5 hover:bg-[#6B5540]"
            >
              {copy.ctaBook}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#26D366]/55 px-8 py-2.5 type-ui uppercase text-[#26D366] transition-all shadow-[0_10px_28px_rgba(38,211,102,0.15)] hover:-translate-y-0.5 hover:bg-[#26D366]/6"
            >
              {copy.ctaWhatsApp}
            </a>
          </div>
        </div>
      </section>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/78 p-4 backdrop-blur-[2px]"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white hover:bg-black/55"
          >
            {copy.lightboxClose}
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[90vh] max-w-[92vw] rounded-2xl border border-white/20 object-contain shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </main>
  )
}

export default ProductsPage
