import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { bookingUrl } from '../constants/siteData'
import Seo from '../components/seo/Seo'
import { createTranslator } from '../i18n/textTable'
import logoWatermark from '../assets/Logo.jpeg'
import uberMeraImage from '../assets/uber1.jpeg'
import vivianePortrait from '../assets/profile.jpeg'

gsap.registerPlugin(ScrollTrigger)

/** Strings aligned with meracosmetics.ch (Figma Sites bundle i18n). */
const COPY = {
  de: {
    seoTitle: 'Über MERA',
    seoDescription:
      'Die Geschichte und Philosophie von MERA Cosmetics: Schweizer Praezision, griechische Wurzeln und individuelle Achtsamkeit fuer deine Erholung.',
    headerTitle: 'Über MERA',
    headerSubtitle: 'Ein Raum für Zeit und Aufmerksamkeit',
    storyTitle: 'Die Geschichte von MERA',
    story1:
      'MERA ist aus dem tiefen Wunsch entstanden, einen Ort zu schaffen, an dem du dich wirklich wohlfühlen kannst. Einen Ort, der mit Liebe und Achtsamkeit gestaltet wurde, in dem du als Mensch im Mittelpunkt stehst, nicht als Kunde.',
    story2:
      'Der Name „MERA" bedeutet für mich „Mein Raum": ein Raum für dich, für mich, für uns. Ein Ort ohne Hektik und ohne Druck. Nur du, deine Zeit und achtsame Erholung.',
    story3:
      'Bei MERA geht es nicht um schnelle Ergebnisse oder darum, Erwartungen zu erfüllen. Es geht darum, dir einen geschützten Raum zu geben, in dem ich mich voll und ganz um deine Erholung kümmere.',
    nameTitle: 'Was bedeutet MERA?',
    nameIntro:
      'Der Name MERA trägt zwei Bedeutungen in sich, die beide für meine Philosophie stehen:',
    nameIndTitle: 'Mera: Der Tag (ΕΛΛΗΝΙΚΆ)',
    nameIndText:
      'Im Griechischen bedeutet „Mera" (μέρα) schlicht: Der Tag. Für mich symbolisiert der Name, dass dies DEIN Tag ist: ein Moment, der nur dir gehört und an dem du im Mittelpunkt stehst.',
    nameNewTitle: 'Ein neuer Anfang',
    nameNewText:
      'Jeder Besuch bei MERA soll sich wie ein neuer Tag anfühlen: frisch, voller Energie und mit dem Gefühl, dass du dir selbst etwas Kostbares geschenkt hast.',
    valuesTitle: 'Meine Werte',
    values: [
      {
        title: 'Respekt vor deiner Individualität',
        text: 'Du bist einzigartig, und genau so behandle ich dich. Bei mir gibt es keine Standards, sondern nur individuelle Lösungen.',
      },
      {
        title: 'Ehrlichkeit vor Verkauf',
        text: 'Ich verkaufe dir nichts, was du nicht brauchst. Meine Empfehlungen basieren auf deinen Bedürfnissen, nicht auf meinem Umsatz.',
      },
      {
        title: 'Vertrauen und Diskretion',
        text: 'Was bei MERA passiert, bleibt bei MERA. Hier kannst du dich vollkommen fallen lassen.',
      },
      {
        title: 'Menschlichkeit vor Perfektion',
        text: 'Bei mir geht es nicht darum, einem Ideal zu entsprechen. Es geht darum, dass du dich bei mir vollkommen wohlfühlst, so wie du bist.',
      },
      {
        title: 'Qualität vor Masse',
        text: 'Ich betreue gezielt nur eine begrenzte Anzahl an Kunden, um jedem die Aufmerksamkeit zu geben, die er verdient.',
      },
    ],
    personIntro: 'Ich bin Viviane Rovito: Schweizerin mit griechischen Wurzeln.',
    personText:
      'Meine Mutter stammt aus Griechenland, und obwohl ich in der Schweiz geboren und aufgewachsen bin, trägt meine Arbeit beide Welten in sich. MERA ist die Verbindung aus Schweizer Präzision und der herzlichen, griechischen „Safe Place“-Philosophie. Es ist mein persönlicher Anspruch, dir einen Raum zu bieten, in dem du dich absolut sicher, geborgen und verstanden fühlst: ein echtes Stück Lebensqualität.',
    personLanguages: 'Beratung und Behandlung auf Deutsch, Englisch und ΕΛΛΗΝΙΚΆ möglich.',
    personCta: 'Kontaktiere mich',
    ctaQuestion: 'Möchtest du mehr erfahren oder direkt einen Termin vereinbaren?',
    ctaTreatments: 'Behandlungen ansehen',
  },
  en: {
    seoTitle: 'About MERA',
    seoDescription:
      'The story and philosophy of MERA Cosmetics: Swiss precision, Greek roots, and individual mindful care for your restoration.',
    headerTitle: 'About MERA',
    headerSubtitle: 'A space for time and attention',
    storyTitle: 'The Story of MERA',
    story1:
      'MERA was born from the deep desire to create a place where you can truly feel comfortable. A place designed with love and mindfulness: where you as a person are at the center, not as a customer.',
    story2:
      'The name "MERA" means "My Space" to me: a space for you, for me, for us. A place without rush and without pressure. Just you, your time and mindful relaxation.',
    story3:
      "At MERA, it's not about quick results or meeting expectations. It's about giving you a safe space where I take full care of your relaxation.",
    nameTitle: 'What does MERA mean?',
    nameIntro: 'The name MERA carries two meanings, both representing my philosophy:',
    nameIndTitle: 'Mera: The Day (ΕΛΛΗΝΙΚΆ)',
    nameIndText:
      'In Greek, "Mera" (μέρα) simply means: The Day. For me, it symbolizes that this is YOUR day: a moment that belongs only to you, where you are the focus.',
    nameNewTitle: 'A New Beginning',
    nameNewText:
      'Every visit to MERA should feel like a new day: fresh, full of energy, and with the feeling that you have given yourself something precious.',
    valuesTitle: 'My Values',
    values: [
      {
        title: 'Respect for your individuality',
        text: "You are unique, and that's exactly how I treat you. There are no standards here, only individual solutions.",
      },
      {
        title: 'Honesty over sales',
        text: "I won't sell you anything you don't need. My recommendations are based on your needs, not my revenue.",
      },
      {
        title: 'Trust and discretion',
        text: 'What happens at MERA stays at MERA. Here you can completely let go.',
      },
      {
        title: 'Humanity over perfection',
        text: "It's not about conforming to an ideal. It's about feeling completely comfortable with me, just as you are.",
      },
      {
        title: 'Quality over quantity',
        text: 'I consciously serve only a limited number of clients to give everyone the attention they deserve.',
      },
    ],
    personIntro: 'I am Viviane Rovito: Swiss with Greek roots.',
    personText:
      'My mother is from Greece, and although I was born and raised in Switzerland, my work carries both worlds within it. MERA is the fusion of Swiss precision and the warm, Greek "Safe Place" philosophy. It is my personal goal to offer you a space where you feel absolutely safe, secure, and understood: a true piece of life quality.',
    personLanguages: 'Consultation and treatment available in German, English, and ΕΛΛΗΝΙΚΆ.',
    personCta: 'Contact me',
    ctaQuestion: 'Would you like to learn more or book an appointment directly?',
    ctaTreatments: 'View treatments',
  },
  gr: {
    seoTitle: 'Σχετικά με MERA',
    seoDescription:
      'Η ιστορία και η φιλοσοφία της MERA Cosmetics: ελβετική ακρίβεια, ελληνικές ρίζες και εξατοικευμένη φροντίδα.',
    headerTitle: 'Σχετικά με MERA',
    headerSubtitle: 'Ένας χώρος για χρόνο και προσοχή',
    storyTitle: 'Η Ιστορία του MERA',
    story1:
      'Το MERA γεννήθηκε από τη βαθιά επιθυμία να δημιουργήσω έναν χώρο όπου μπορείς πραγματικά να νιώθεις άνετα. Ένας χώρος που σχεδιάστηκε με αγάπη και προσοχή: όπου εσύ ως άνθρωπος είσαι στο επίκεντρο, όχι ως πελάτης.',
    story2:
      'Το όνομα "MERA" σημαίνει για μένα "Ο Χώρος μου": ένας χώρος για σένα, για μένα, για εμάς. Ένας τόπος χωρίς βιασύνη και χωρίς πίεση. Μόνο εσύ, ο χρόνος σου και συνειδητή αναζωογόνηση.',
    story3:
      'Στη MERA δεν πρόκειται για γρήγορα αποτελέσματα ή για το να πληρούνται προσδοκίες. Πρόκειται για το να σου προσφέρω έναν ασφαλή χώρο όπου φροντίζω πλήρως τη χαλάρωσή σου.',
    nameTitle: 'Τι σημαίνει MERA;',
    nameIntro: 'Το όνομα MERA φέρει δύο σημασίες, και οι δύο αντιπροσωπεύουν τη φιλοσοφία μου:',
    nameIndTitle: 'Mera: Η Μέρα (ΕΛΛΗΝΙΚΆ)',
    nameIndText:
      'Στα Ελληνικά, η λέξη "Mera" (μέρα) σημαίνει απλά: Η Μέρα. Για μένα συμβολίζει ότι αυτή είναι η ΔΙΚΗ ΣΟΥ μέρα: μια στιγμή που σου ανήκει αποκλειστικά, όπου εσύ είσαι το επίκεντρο.',
    nameNewTitle: 'Μια νέα αρχή',
    nameNewText:
      'Κάθε επίσκεψη στο MERA πρέπει να την αισθάνεσαι σαν μια νέα μέρα: φρέσκια, γεμάτη ενέργεια και με το αίσθημα ότι έδωσες στον εαυτό σου κάτι πολύτιμο.',
    valuesTitle: 'Οι Αξίες μου',
    values: [
      {
        title: 'Σεβασμός για την ατομικότητά σου',
        text: 'Είσαι μοναδικός, και ακριβώς έτσι σε αντιμετωπίζω. Εδώ δεν υπάρχουν πρότυπα, μόνο ατομικές λύσεις.',
      },
      {
        title: 'Ειλικρίνεια πάνω από πωλήσεις',
        text: 'Δεν θα σου πουλήσω κάτι που δεν χρειάζεσαι. Οι συστάσεις μου βασίζονται στις ανάγκες σου, όχι στα έσοδά μου.',
      },
      {
        title: 'Εμπιστοσύνη και διακριτικότητα',
        text: 'Αυτό που συμβαίνει στο MERA μένει στο MERA. Εδώ μπορείς να αφεθείς εντελώς.',
      },
      {
        title: 'Ανθρωπιά πάνω από τελειότητα',
        text: 'Δεν πρόκειται για το να ακολουθήσεις ένα ιδανικό. Πρόκειται για να νιώθεις εντελώς άνετα μαζί μου, ακριβώς όπως είσαι.',
      },
      {
        title: 'Ποιότητα πάνω από ποσότητα',
        text: 'Εξυπηρετώ συνειδητά μόνο έναν περιορισμένο αριθμό πελατών για να δώσω σε όλους την προσοχή που τους αξίζει.',
      },
    ],
    personIntro: 'Είμαι η Viviane Rovito: Ελβετίδα με ελληνικές ρίζες.',
    personText:
      'Η μητέρα μου κατάγεται από την Ελλάδα και παρόλο που γεννήθηκα και μεγάλωσα στην Ελβετία, η δουλειά μου φέρει και τους δύο κόσμους μέσα της. Το MERA είναι η ένωση της ελβετικής ακρίβειας και της θερμής, ελληνικής φιλοσοφίας „Safe Place“. Είναι προσωπική μου φιλοδοξία να σου προσφέρω έναν χώρο όπου θα νιώθεις απόλυτα ασφαλής, σίγουρος και κατανοητός: ένα πραγματικό κομμάτι ποιότητας ζωής.',
    personLanguages:
      'Συμβουλευτική και θεραπεία διαθέσιμη στα Γερμανικά, Αγγλικά και ΕΛΛΗΝΙΚΆ.',
    personCta: 'Επικοινώνησε μαζί μου',
    ctaQuestion: 'Θα ήθελες να μάθεις περισσότερα ή να κλείσεις ραντεβού απευθείας;',
    ctaTreatments: 'Δες θεραπείες',
  },
}

const cardShadow =
  'shadow-[0_35px_60px_-15px_rgba(74,63,53,0.14)] hover:shadow-[0_35px_60px_-12px_rgba(139,115,85,0.18)]'

function AboutPage({ language }) {
  const rootRef = useRef(null)
  const t = createTranslator(language)
  const locale = language === 'en' || language === 'gr' ? language : 'de'
  const copy = COPY[locale]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-about-hero]',
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.05,
        },
      )

      gsap.utils.toArray('[data-about-fade]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          },
        )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [locale])

  return (
    <main ref={rootRef} className="pt-[86px] lg:pt-[94px] min-h-screen bg-[#FAF7F2]">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path="/uber-mera"
        lang={locale}
        keywords="Ueber MERA, Kosmetik Philosophie, Viviane Rovito, Beauty Salon Dietikon, MERA Werte"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'Ueber MERA',
          url: 'https://www.meracosmetics.ch/uber-mera',
          isPartOf: {
            '@type': 'WebSite',
            name: 'MERA Cosmetics',
            url: 'https://www.meracosmetics.ch/',
          },
        }}
      />

      {/* Hero — matches live: gradient, watermark, centered title + sans subtitle */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE7] to-[#E8DDD0]/20 px-6 py-16 lg:px-12 lg:py-28">
        <img
          src={logoWatermark}
          alt=""
          className="pointer-events-none absolute -left-20 top-20 w-[40vw] max-w-[520px] rotate-12 select-none opacity-[0.03]"
        />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1
            data-about-hero
            className="mb-6 font-serif text-4xl leading-tight tracking-tight text-[#4A3F35] md:text-5xl lg:text-6xl"
          >
            {copy.headerTitle}
          </h1>
          <p
            data-about-hero
            className="mx-auto max-w-3xl font-sans text-base leading-relaxed text-[#7A6F65] lg:text-lg"
          >
            {copy.headerSubtitle}
          </p>
        </div>
      </section>

      {/* Story — centered column (~max 72rem); compact image left; lg matches text height */}
      <section className="px-6 py-20 lg:px-12 lg:py-36">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-12 xl:gap-14">
          <div
            data-about-fade
            className="order-1 flex min-h-0 justify-center lg:col-span-5 lg:h-full lg:min-h-0 lg:justify-start"
          >
            <div
              className={`group aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-2xl bg-[#D4C4B0] sm:max-w-[260px] lg:aspect-auto lg:h-full lg:max-h-full lg:max-w-[min(280px,100%)] lg:min-h-0 lg:rounded-3xl ${cardShadow} transition-all duration-700`}
            >
              <img
                src={uberMeraImage}
                alt="MERA Studio Interior"
                className="h-full min-h-0 w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
              />
            </div>
          </div>
          <div
            data-about-fade
            className="order-2 space-y-5 font-sans leading-relaxed text-[#7A6F65] lg:col-span-7 lg:space-y-6"
          >
            <h2 className="mb-4 font-serif text-3xl leading-tight tracking-tight text-[#4A3F35] lg:mb-6 lg:text-5xl">
              {copy.storyTitle}
            </h2>
            <p className="text-base lg:text-lg">{copy.story1}</p>
            <p className="text-base lg:text-lg">{copy.story2}</p>
            <p className="text-base lg:text-lg">{copy.story3}</p>
          </div>
        </div>
      </section>

      {/* Name meaning */}
      <section className="relative overflow-hidden bg-[#E8DDD0]/30 px-6 py-20 lg:px-12 lg:py-36">
        <div className="relative z-10 mx-auto mb-14 max-w-6xl text-center">
          <h2 className="mb-6 font-serif text-3xl tracking-tight text-[#4A3F35] lg:text-5xl">
            {copy.nameTitle}
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#7A6F65] lg:text-lg">
            {copy.nameIntro}
          </p>
        </div>
        <div
          data-about-fade
          className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
        >
          <div className="group rounded-3xl border border-white/20 bg-white/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-700 hover:bg-white/60 lg:p-12">
            <h3 className="mb-4 font-serif text-2xl text-[#4A3F35] transition-colors group-hover:text-[#8B7355] lg:text-3xl">
              {copy.nameIndTitle}
            </h3>
            <p className="text-base leading-relaxed text-[#7A6F65]">{copy.nameIndText}</p>
          </div>
          <div className="group rounded-3xl border border-white/20 bg-white/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-700 hover:bg-white/60 lg:p-12">
            <h3 className="mb-4 font-serif text-2xl text-[#4A3F35] transition-colors group-hover:text-[#8B7355] lg:text-3xl">
              {copy.nameNewTitle}
            </h3>
            <p className="text-base leading-relaxed text-[#7A6F65]">{copy.nameNewText}</p>
          </div>
        </div>
      </section>

      {/* Viviane — portrait + card share one row height on lg (stretch, no items-center) */}
      <section className="px-6 py-20 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-16">
          <div
            data-about-fade
            className="flex min-h-0 lg:col-span-5 lg:h-full lg:min-h-0"
          >
            <div
              className={`aspect-[4/5] w-full min-h-0 overflow-hidden rounded-3xl bg-[#2C2C2C] lg:aspect-auto lg:h-full ${cardShadow}`}
            >
              <img
                src={vivianePortrait}
                alt="Viviane Rovito - MERA Cosmetics"
                className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
              />
            </div>
          </div>
          <div
            data-about-fade
            className="flex min-h-0 lg:col-span-7 lg:h-full lg:min-h-0"
          >
            <div className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl bg-[#E8DDD0]/40 p-8 shadow-2xl lg:p-12">
              <img
                src={logoWatermark}
                alt=""
                className="pointer-events-none absolute -bottom-10 -right-10 w-40 select-none opacity-[0.03] transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <h2 className="mb-8 font-serif text-4xl italic leading-[0.85] tracking-tighter text-[#4A3F35] lg:text-6xl">
                Viviane Rovito
              </h2>
              <p className="mb-6 font-serif text-base italic leading-relaxed text-[#7A6F65] lg:text-lg">
                {copy.personIntro}
              </p>
              <p className="mb-6 text-base leading-relaxed text-[#7A6F65] lg:text-lg">{copy.personText}</p>
              <p className="font-sans text-xs uppercase tracking-widest text-[#8B7355] lg:text-sm">
                {copy.personLanguages}
              </p>
              <div className="mt-auto pt-8 text-center lg:text-left">
                <Link
                  to="/kontakt"
                  className="inline-block rounded-full bg-[#8B7355] px-10 py-4 text-[0.75rem] uppercase tracking-[0.15em] text-[#FAF7F2] shadow-xl transition-all duration-500 hover:scale-105 hover:bg-[#6B5540] hover:shadow-[0_20px_50px_rgba(139,115,85,0.2)] active:scale-95"
                >
                  {copy.personCta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — five cards, same order as live bundle */}
      <section className="bg-[#E8DDD0]/20 px-6 py-20 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-6xl">
          <h2
            data-about-fade
            className="mb-14 text-center font-serif text-3xl tracking-tight text-[#4A3F35] lg:text-5xl"
          >
            {copy.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
            {copy.values.map((item, index) => (
              <article
                key={`value-${locale}-${index}`}
                data-about-fade
                className="group rounded-3xl border border-white/20 bg-white/40 p-8 backdrop-blur-md transition-all duration-700 hover:bg-white/60 hover:shadow-2xl lg:p-10"
              >
                <h3 className="mb-3 font-serif text-xl text-[#4A3F35] transition-colors group-hover:text-[#8B7355] lg:text-2xl">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-[#7A6F65]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA — treatments + Fresha (matches live) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E8DDD0]/30 to-[#FAF7F2] px-6 py-20 lg:px-12 lg:py-40">
        <img
          src={logoWatermark}
          alt=""
          className="pointer-events-none absolute left-1/2 top-1/2 w-[60vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.02]"
        />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p
            data-about-fade
            className="mb-10 font-sans text-lg italic leading-relaxed text-[#7A6F65] lg:text-2xl"
          >
            {copy.ctaQuestion}
          </p>
          <div
            data-about-fade
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Link
              to="/behandlungen"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#8B7355] px-10 py-4 text-[0.75rem] uppercase tracking-[0.15em] text-[#8B7355] shadow-xl transition-all duration-500 hover:bg-[#8B7355] hover:text-[#FAF7F2]"
            >
              {copy.ctaTreatments}
            </Link>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#8B7355] px-10 py-4 text-[0.75rem] uppercase tracking-[0.15em] text-[#FAF7F2] shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-[#6B5540] hover:shadow-[0_20px_50px_rgba(139,115,85,0.3)]"
            >
              {t('nav.book')}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
