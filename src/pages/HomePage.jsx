import LandingSections from '../components/sections/LandingSections'
import Seo from '../components/seo/Seo'
import { SITE_URL } from '../constants/siteData'
import logoImage from '../assets/Logo.jpeg'

function HomePage({ language }) {
  const locale = language === 'en' || language === 'gr' ? language : 'de'

  const seo = {
    de: {
      title: 'MERA Cosmetics in Dietikon',
      description:
        'Privater Rückzugsort für Ästhetik, Maniküre, Pediküre, Waxing und Körperbehandlungen in Dietikon. Buche deinen Termin bei MERA Cosmetics.',
      keywords:
        'MERA Cosmetics, Kosmetik Dietikon, Maniküre Dietikon, Pediküre Dietikon, Waxing Dietikon, Wimpernlifting, Körperpeeling',
    },
    en: {
      title: 'MERA Cosmetics in Dietikon',
      description:
        'A private retreat for aesthetics, manicure, pedicure, waxing, and body treatments in Dietikon. Book your appointment at MERA Cosmetics.',
      keywords:
        'MERA Cosmetics, beauty salon Dietikon, manicure Dietikon, pedicure Dietikon, waxing Dietikon, lash lift, body peeling',
    },
    gr: {
      title: 'MERA Cosmetics στο Dietikon',
      description:
        'Ένας ιδιωτικός χώρος για αισθητική, μανικιούρ, πεντικιούρ, αποτρίχωση και θεραπείες σώματος στο Dietikon. Κλείσε ραντεβού στη MERA Cosmetics.',
      keywords:
        'MERA Cosmetics, αισθητικό Dietikon, μανικιούρ, πεντικιούρ, αποτρίχωση, Dietikon',
    },
  }[locale]

  const salonImageUrl = `${SITE_URL}${logoImage}`

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path="/"
        keywords={seo.keywords}
        lang={locale}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'BeautySalon',
          name: 'MERA Cosmetics',
          url: `${SITE_URL}/`,
          image: salonImageUrl,
          telephone: '+41 78 211 15 03',
          email: 'info@meracosmetics.ch',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Staffelackerstrasse 11',
            postalCode: '8953',
            addressLocality: 'Dietikon',
            addressCountry: 'CH',
          },
        }}
      />
      <LandingSections language={language} />
    </>
  )
}

export default HomePage
