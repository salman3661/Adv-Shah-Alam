export const SITE_BASE = 'https://www.advmdshahalam.me';

export const ADVOCATE_NAP = {
  name: 'Advocate Md. Shah Alam',
  alternateName: [
    'Md. Shah Alam',
    'Advocate Md Shah Alam',
    'Md. Shah Alam Advocate',
    'এডভোকেট মোঃ শাহ আলম',
  ],
  firmName: 'Advocate Md. Shah Alam Law Chamber',
  firmAlternateName: 'এডভোকেট মোঃ শাহ আলম ল চেম্বার',
  telephone: '+8801712655546',
  whatsapp: '+8801955802007',
  email: 'contact@advmdshahalam.me',
  url: `${SITE_BASE}/advocate-md-shah-alam`,
  image: `${SITE_BASE}/images/hero/hero-md-shah-alam.png`,
  firmImage: `${SITE_BASE}/images/advocate-shah-alam.jpg`,
  logo: `${SITE_BASE}/adv-md-shah-alam.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'House 46, Road 6/B, Sector 12, Uttara West',
    addressLocality: 'Dhaka',
    addressRegion: 'Dhaka',
    postalCode: '1230',
    addressCountry: 'BD',
  },
  judgeCourtAddress: {
    '@type': 'PostalAddress',
    streetAddress: 'Lawyers Association Building, 4th Floor, 6/7 Court House Street, Kotwali',
    addressLocality: 'Judge Court, Dhaka',
    addressRegion: 'Dhaka',
    postalCode: '1100',
    addressCountry: 'BD',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.8745,
    longitude: 90.3987,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '14:00',
    },
  ],
  knowsLanguage: ['bn-BD', 'en'],
  // Only verified, owner-controlled profile URLs already present in the repository
  sameAs: [
    'https://www.facebook.com/advmd.shahalamfb',
    'https://www.linkedin.com/in/advmdshahalam/',
    'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
  ],
};

export function buildPersonEntity() {
  return {
    '@type': 'Person',
    '@id': `${SITE_BASE}/#attorney`,
    name: ADVOCATE_NAP.name,
    alternateName: ADVOCATE_NAP.alternateName,
    jobTitle: 'Advocate, Supreme Court of Bangladesh',
    url: ADVOCATE_NAP.url,
    image: ADVOCATE_NAP.image,
    telephone: ADVOCATE_NAP.telephone,
    email: ADVOCATE_NAP.email,
    address: ADVOCATE_NAP.address,
    knowsLanguage: ADVOCATE_NAP.knowsLanguage,
    worksFor: { '@id': `${SITE_BASE}/#legalservice` },
    memberOf: [
      { '@type': 'Organization', name: 'Bangladesh Bar Council' },
      { '@type': 'Organization', name: 'Supreme Court Bar Association' },
      { '@type': 'Organization', name: 'Dhaka Bar Association' },
    ],
    sameAs: ADVOCATE_NAP.sameAs,
  };
}

export function buildLegalServiceEntity() {
  return {
    '@type': 'LegalService',
    '@id': `${SITE_BASE}/#legalservice`,
    name: ADVOCATE_NAP.firmName,
    alternateName: ADVOCATE_NAP.firmAlternateName,
    url: SITE_BASE,
    logo: ADVOCATE_NAP.logo,
    image: ADVOCATE_NAP.firmImage,
    telephone: ADVOCATE_NAP.telephone,
    email: ADVOCATE_NAP.email,
    address: [ADVOCATE_NAP.address, ADVOCATE_NAP.judgeCourtAddress],
    geo: ADVOCATE_NAP.geo,
    openingHoursSpecification: ADVOCATE_NAP.openingHoursSpecification,
    areaServed: { '@type': 'Country', name: 'Bangladesh' },
    knowsLanguage: ADVOCATE_NAP.knowsLanguage,
    employee: { '@id': `${SITE_BASE}/#attorney` },
    sameAs: ADVOCATE_NAP.sameAs,
  };
}

export function buildWebSiteEntity(lang = 'en') {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_BASE}/#website`,
    name: lang === 'bn' ? 'এডভোকেট মোঃ শাহ আলম' : 'Advocate Md. Shah Alam',
    url: `${SITE_BASE}/`,
    inLanguage: lang,
    publisher: { '@id': `${SITE_BASE}/#legalservice` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_BASE}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildServicePageSchema({ url, lang = 'en', serviceType, name, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${url}#service`,
    name,
    description,
    url,
    inLanguage: lang === 'bn' ? 'bn-BD' : 'en',
    serviceType,
    telephone: ADVOCATE_NAP.telephone,
    email: ADVOCATE_NAP.email,
    address: ADVOCATE_NAP.address,
    areaServed: { '@type': 'Country', name: 'Bangladesh' },
    provider: { '@id': `${SITE_BASE}/#attorney` },
    parentOrganization: { '@id': `${SITE_BASE}/#legalservice` },
  };
}
