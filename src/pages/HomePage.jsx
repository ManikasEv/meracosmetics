import LandingSections from '../components/sections/LandingSections'
import Seo from '../components/seo/Seo'
import { SITE_URL } from '../constants/siteData'
import logoImage from '../assets/Logo.jpeg'

function HomePage({ language }) {
  const locale = language === 'en' || language === 'gr' ? language : 'de'

  const seo = {
    de: {
      title: 'MERA Cosmetics in Zürich',
      description:
        'Privater Rückzugsort für Ästhetik, Maniküre, Pediküre, Waxing und Körperbehandlungen in Zürich. Buche deinen Termin bei MERA Cosmetics.',
      keywords:
        'MERA Cosmetics, Kosmetik Zürich, Maniküre Zürich, Pediküre Zürich, Waxing Zürich, Wimpernlifting, Körperpeeling',
    },
    en: {
      title: 'MERA Cosmetics in Zürich',
      description:
        'A private retreat for aesthetics, manicure, pedicure, waxing, and body treatments in Zürich. Book your appointment at MERA Cosmetics.',
      keywords:
        'MERA Cosmetics, beauty salon Zürich, manicure Zürich, pedicure Zürich, waxing Zürich, lash lift, body peeling',
    },
    gr: {
      title: 'MERA Cosmetics στη Ζυρίχη',
      description:
        'Ένας ιδιωτικός χώρος για αισθητική, μανικιούρ, πεντικιούρ, αποτρίχωση και θεραπείες σώματος στη Ζυρίχη. Κλείσε ραντεβού στη MERA Cosmetics.',
      keywords:
        'MERA Cosmetics, αισθητικό Ζυρίχη, μανικιούρ, πεντικιούρ, αποτρίχωση, Ζυρίχη',
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
            streetAddress: 'Stampfenbachstrasse 151',
            postalCode: '8006',
            addressLocality: 'Zürich',
            addressCountry: 'CH',
          },
        }}
      />
      <LandingSections language={language} />
    </>
  )
}

export default HomePage
