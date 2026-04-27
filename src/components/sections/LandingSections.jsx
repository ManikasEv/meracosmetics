import { useLayoutEffect, useRef } from 'react'
import { bookingUrl } from '../../constants/siteData'
import { createTranslator } from '../../i18n/textTable'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitLetters } from '../animations/SplitLetters'
import fadedLogo from '../../assets/Logo.jpeg'
import heroImage from '../../assets/p1.jpeg'
import philosophyImage from '../../assets/philosofy.jpeg'
import bioConceptImage from '../../assets/profile.jpeg'

gsap.registerPlugin(ScrollTrigger)

function HeroSection({ t }) {
  return (
    <section
      id="home"
      className="min-h-[68svh] lg:min-h-[80svh] flex items-center justify-center px-5 lg:px-12 py-8 lg:py-14 bg-[#FDFBF8] relative overflow-hidden border-b border-[#4A3F35]/5"
    >
      <div className="absolute inset-x-0 top-[64px] lg:top-[84px] h-px bg-[#4A3F35]/4"></div>

      <div className="hero-faded-logo hidden md:block absolute right-[-130px] md:right-[-70px] top-[38%] -translate-y-1/2 w-[320px] md:w-[430px] lg:w-[520px] opacity-[0.05] pointer-events-none select-none">
        <img src={fadedLogo} alt="" className="w-full h-auto object-contain" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div data-hero-entrance className="mb-5 lg:mb-8">
          <img
            src={heroImage}
            alt="MERA Cosmetics"
            className="w-full max-w-[620px] h-auto mx-auto object-contain"
          />
        </div>
        <SplitLetters
          text={t('hero.title')}
          as="h1"
          immediate
          className="type-title mb-4 text-[#4A3F35] font-serif"
        />
        <p
          data-hero-entrance
          className="type-subtitle text-[#7A6F65] max-w-3xl mx-auto mb-6 font-serif italic opacity-70 px-1"
        >
          {t('hero.subtitle')}
        </p>
        <a
          data-hero-entrance
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-mera-pill inline-block px-8 md:px-10 py-3 md:py-3.5 bg-[#8B7355] text-[#FAF7F2] type-ui uppercase rounded-full hover:bg-[#6B5540] transition-all duration-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 font-medium"
        >
          {t('nav.book')}
        </a>
      </div>
    </section>
  )
}

function ConceptSection({ t }) {
  return (
    <section
      id="behandlungen"
      className="py-14 lg:py-28 px-5 lg:px-12 bg-white/70 border-y border-[#4A3F35]/5"
    >
      <div className="max-w-5xl mx-auto space-y-8 lg:space-y-16">
        <div className="space-y-4">
          <span
            data-reveal-fade
            className="block type-ui uppercase text-[#8B7355] font-bold italic opacity-60"
          >
            {t('concept.tag')}
          </span>
          <SplitLetters
            text={t('concept.title')}
            as="h2"
            className="type-title text-[#4A3F35] font-serif"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
          <p
            data-reveal-fade
            className="type-subtitle text-[#7A6F65] font-serif italic opacity-80"
          >
            {t('concept.text1')}
          </p>
          <div className="space-y-7">
            <p data-reveal-fade className="type-text text-[#7A6F65]">
              {t('concept.text2')}
            </p>
            <a
              data-reveal-fade
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block type-ui uppercase text-[#4A3F35] font-bold border-b border-[#8B7355]/40 pb-1 hover:border-[#8B7355] transition-all duration-500"
            >
              {t('nav.book')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhilosophySection({ t }) {
  return (
    <section id="philosophie" className="py-16 lg:py-36 px-5 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-16 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <span
            data-reveal-fade
            className="block type-ui uppercase text-[#8B7355] mb-6 font-medium"
          >
            {t('philosophy.tag')}
          </span>
          <SplitLetters
            text={t('philosophy.title')}
            as="h2"
            className="type-title mb-6 text-[#4A3F35] font-serif"
          />
          <div className="space-y-5 type-text text-[#7A6F65] font-serif italic opacity-80">
            <p data-reveal-fade>{t('philosophy.text1')}</p>
            <p data-reveal-fade>{t('philosophy.text2')}</p>
          </div>
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div
            data-reveal-fade
            className="aspect-[5/6] lg:aspect-[4/5] max-w-[560px] ml-auto overflow-hidden rounded-[1.8rem] lg:rounded-[2.4rem] bg-[#F5EFE7] shadow-sm"
          >
            <img
              src={philosophyImage}
              alt="MERA Studio"
              className="w-full h-full object-cover object-[center_32%] transition-transform duration-[1400ms] hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection({ t }) {
  return (
    <section className="py-16 lg:py-36 px-5 lg:px-12 bg-[#E8DDD0]/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
        <div className="text-center group transition-transform duration-500 hover:-translate-y-1">
          <SplitLetters
            text={t('values.nature')}
            as="h3"
            className="type-subtitle mb-4 text-[#4A3F35] font-serif italic group-hover:text-[#8B7355] transition-colors duration-500"
          />
          <p data-reveal-fade className="type-text text-[#7A6F65] font-serif opacity-70">
            {t('values.natureText')}
          </p>
        </div>
        <div className="text-center group transition-transform duration-500 hover:-translate-y-1">
          <SplitLetters
            text={t('values.mindfulness')}
            as="h3"
            className="type-subtitle mb-4 text-[#4A3F35] font-serif italic group-hover:text-[#8B7355] transition-colors duration-500"
          />
          <p data-reveal-fade className="type-text text-[#7A6F65] font-serif opacity-70">
            {t('values.mindfulnessText')}
          </p>
        </div>
        <div className="text-center group transition-transform duration-500 hover:-translate-y-1">
          <SplitLetters
            text={t('values.trust')}
            as="h3"
            className="type-subtitle mb-4 text-[#4A3F35] font-serif italic group-hover:text-[#8B7355] transition-colors duration-500"
          />
          <p data-reveal-fade className="type-text text-[#7A6F65] font-serif opacity-70">
            {t('values.trustText')}
          </p>
        </div>
      </div>
    </section>
  )
}

function ProfileSection({ t }) {
  return (
    <section className="py-16 lg:py-36 px-5 lg:px-12 bg-[#FDFBF8]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
        <div className="lg:col-span-5">
          <div
            data-reveal-fade
            className="h-full min-h-[320px] lg:min-h-[520px] overflow-hidden rounded-[1.6rem] lg:rounded-[2.2rem] relative group shadow-sm"
          >
            <img
              src={bioConceptImage}
              alt="Viviane Rovito"
              className="w-full h-full object-cover object-[center_20%] transition-transform duration-[1400ms] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent"></div>
            <div className="absolute left-6 right-6 bottom-6 text-[#F5EDE3]">
              <p className="type-ui uppercase opacity-75">{t('bio.tag')}</p>
              <p className="mt-2 type-subtitle font-serif italic opacity-90">{t('bio.role')}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="h-full rounded-[1.6rem] lg:rounded-[2.2rem] border border-[#4A3F35]/10 bg-white/70 backdrop-blur-sm p-5 md:p-7 lg:p-11 shadow-sm flex flex-col justify-between">
            <div>
              <span
                data-reveal-fade
                className="block type-ui uppercase text-[#8B7355] opacity-75 mb-4"
              >
                {t('bio.tag')}
              </span>

              <SplitLetters
                text={t('bio.title')}
                as="h3"
                className="type-subtitle font-serif text-[#3E342C] mb-5 max-w-[14ch]"
              />

              <p
                data-reveal-fade
                className="type-subtitle italic text-[#5E5247] mb-5 lg:mb-7 max-w-[40ch]"
              >
                {t('bio.subtitle')}
              </p>

              <div className="space-y-4 type-text text-[#5E5247] max-w-[52ch]">
                <p data-reveal-fade>{t('bio.text1')}</p>
                <p data-reveal-fade>{t('bio.text2')}</p>
              </div>
            </div>

            <div
              data-reveal-fade
              className="mt-6 pt-5 border-t border-[#4A3F35]/10 flex items-center justify-between gap-4"
            >
              <p className="type-ui uppercase text-[#7A6F65]">{t('bio.role')}</p>
              <span className="inline-flex items-center rounded-full border border-[#8B7355]/25 px-4 py-1.5 type-ui uppercase text-[#8B7355] transition-all duration-500 hover:bg-[#8B7355]/10 hover:border-[#8B7355]/40">
                {t('bio.badge')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function JournalSection({ t }) {
  return (
    <section className="min-h-[70svh] py-20 lg:py-24 px-5 lg:px-12 bg-white flex items-center">
      <div className="max-w-6xl mx-auto text-center w-full">
        <div className="space-y-3">
          <span
            data-reveal-fade
            className="block type-ui uppercase not-italic text-[#B5A896] font-medium"
          >
            {t('journal.tag')}
          </span>
          <SplitLetters
            text={t('journal.title')}
            as="h2"
            className="type-title text-[#4A3F35] font-serif"
          />
          <p
            data-reveal-fade
            className="type-subtitle text-[#B5AEA5] font-serif italic"
          >
            {t('journal.subtitle')}
          </p>
        </div>
        {/* Not using data-reveal-fade: GSAP left the CTA at opacity 0 if ScrollTrigger did not run */}
        <div className="pt-12 lg:pt-14">
          <a
            href="https://www.instagram.com/mera.cosmetics.zh/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-w-[200px] px-9 py-3 border border-[#C9BDAE] text-[#8B7355] type-ui uppercase rounded-full bg-white/80 hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] hover:-translate-y-0.5 hover:shadow-md transition-all duration-500 font-medium"
          >
            @mera.cosmetics.zh
          </a>
        </div>
      </div>
    </section>
  )
}

function CtaSection({ t }) {
  return (
    <section className="relative py-20 lg:py-32 px-5 lg:px-12 bg-[#FDFBF8] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] select-none">
        <img src={fadedLogo} alt="" className="w-[280px] md:w-[380px] h-auto object-contain" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <SplitLetters
          text={t('cta.title')}
          as="h2"
          className="type-title text-[#4A3F35] font-serif"
        />
        <p
          data-reveal-fade
          className="mt-8 type-subtitle text-[#7A6F65] font-serif italic opacity-70 max-w-3xl mx-auto"
        >
          {t('cta.subtitle')}
        </p>
        <a
          data-reveal-fade
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-mera-pill mt-10 inline-flex items-center justify-center px-10 py-3 bg-[#8B7355] text-[#FAF7F2] type-ui uppercase rounded-full hover:bg-[#6B5540] transition-all duration-500 shadow-[0_14px_30px_rgba(74,63,53,0.2)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(74,63,53,0.26)] active:scale-95 font-medium"
        >
          {t('nav.book')}
        </a>
      </div>
    </section>
  )
}

function LandingSections({ language }) {
  const t = createTranslator(language)
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-entrance]', {
        autoAlpha: 0,
        y: 26,
        duration: 0.88,
        stagger: 0.09,
        ease: 'power3.out',
        delay: 0.12,
      })

      gsap.utils.toArray('[data-reveal-fade]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.88,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })

      gsap.to('.hero-faded-logo', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [language])

  return (
    <main ref={rootRef} className="pt-0 overflow-x-hidden">
      <HeroSection t={t} />
      <ConceptSection t={t} />
      <PhilosophySection t={t} />
      <ValuesSection t={t} />
      <ProfileSection t={t} />
      <JournalSection t={t} />
      <CtaSection t={t} />
    </main>
  )
}

export default LandingSections
