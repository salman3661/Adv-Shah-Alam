export const SITE_BASE = 'https://www.advmdshahalam.me';

export const AREA_SERVED = [
  { '@type': 'City', name: 'Dhaka' },
  {
    '@type': 'Place',
    name: 'Uttara Model Town, Dhaka',
    description: 'Sectors 1–17, Uttara West and Uttara East',
  },
  { '@type': 'Place', name: 'Uttara West, Dhaka' },
  { '@type': 'Place', name: 'Uttara East, Dhaka' },
  { '@type': 'Place', name: 'Gulshan, Dhaka' },
  { '@type': 'Place', name: 'Banani, Dhaka' },
  { '@type': 'Place', name: 'Bashundhara Residential Area, Dhaka' },
  { '@type': 'Place', name: 'Turag, Dhaka' },
  { '@type': 'Place', name: 'Dakshinkhan, Dhaka' },
  { '@type': 'Place', name: 'Airport, Dhaka' },
  { '@type': 'Country', name: 'Bangladesh' },
];

const placeList = (names) => names.map((name) => ({ '@type': 'Place', name }));

export const SERVICE_AREAS = {
  criminal: placeList([
    'Uttara West Police Station Jurisdiction, Dhaka',
    'Uttara East Police Station Jurisdiction, Dhaka',
    'Airport (Bimanbandar) Police Station Jurisdiction, Dhaka',
    'Turag Police Station Jurisdiction, Dhaka',
    'Dakshinkhan Police Station Jurisdiction, Dhaka',
  ]),
  land: placeList([
    'DNCC Ward 1 (Uttara Sectors 1–10), Dhaka',
    'DNCC Ward 51–54 (Uttara Sectors 11–14, Baunia, Diabari, Kamarpara), Dhaka',
    'Bashundhara Residential Area, Dhaka',
    'Gulshan, Dhaka',
    'Banani, Dhaka',
  ]),
  family: placeList([
    'Uttara Sectors 1–17, Dhaka',
    'Gulshan, Dhaka',
    'Banani, Dhaka',
    'Turag, Dhaka',
    'Dakshinkhan, Dhaka',
  ]),
  rent: placeList([
    'Uttara, Dhaka',
    'Gulshan, Dhaka',
    'Banani, Dhaka',
    'Bashundhara Residential Area, Dhaka',
    'Mirpur, Dhaka',
  ]),
  corporate: placeList([
    'Banani, Dhaka',
    'Gulshan, Dhaka',
    'Bashundhara Residential Area, Dhaka',
    'Uttara, Dhaka',
  ]),
};

export function getServiceAreaServed(key = '') {
  const k = String(key).toLowerCase();
  if (/criminal|bail/.test(k)) return [...SERVICE_AREAS.criminal, { '@type': 'Country', name: 'Bangladesh' }];
  if (/land|property/.test(k)) return [...SERVICE_AREAS.land, { '@type': 'Country', name: 'Bangladesh' }];
  if (/divorce|family/.test(k)) return [...SERVICE_AREAS.family, { '@type': 'Country', name: 'Bangladesh' }];
  if (/company|corporate|tax/.test(k)) return [...SERVICE_AREAS.corporate, { '@type': 'Country', name: 'Bangladesh' }];
  return AREA_SERVED;
}

export const OFFER_CATALOG = {
  '@type': 'OfferCatalog',
  name: 'Legal services',
  itemListElement: [
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Criminal defence and bail' },
      areaServed: SERVICE_AREAS.criminal,
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Land registration, mutation and lis pendens' },
      areaServed: SERVICE_AREAS.land,
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Family law, divorce, custody, court marriage' },
      areaServed: SERVICE_AREAS.family,
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Rent dispute and eviction (Rent Control Act 1991)' },
      areaServed: SERVICE_AREAS.rent,
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Corporate, company and tax advisory' },
      areaServed: SERVICE_AREAS.corporate,
    },
  ],
};

export const OFFICE_HOURS = {
  en: 'Sunday – Thursday: 8:00 AM – 10:00 PM; Friday – Saturday (Uttara Chamber): 10:00 AM – 10:00 PM',
  bn: 'রবিবার – বৃহস্পতিবার: সকাল ৮:০০ – রাত ১০:০০; শুক্র – শনিবার (উত্তরা চেম্বার): সকাল ১০:০০ – রাত ১০:০০',
  shortEn: 'Sun–Thu 08:00–22:00, Fri–Sat 10:00–22:00 (Uttara)',
  shortBn: 'রবি–বৃহস্পতি সকাল ৮টা–রাত ১০টা, শুক্র–শনি সকাল ১০টা–রাত ১০টা (উত্তরা)',
  schema: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '10:00',
      closes: '22:00',
    },
  ],
};

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
      opens: '08:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '10:00',
      closes: '22:00',
    },
  ],
  experienceYears: '10+ years',
  officeHours: OFFICE_HOURS,
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
    areaServed: AREA_SERVED,
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
    areaServed: AREA_SERVED,
    hasOfferCatalog: OFFER_CATALOG,
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

export function buildServicePageSchema({ url, lang = 'en', serviceType, name, description, slug = '' }) {
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
    geo: ADVOCATE_NAP.geo,
    openingHoursSpecification: ADVOCATE_NAP.openingHoursSpecification,
    areaServed: getServiceAreaServed(slug || serviceType),
    provider: { '@id': `${SITE_BASE}/#attorney` },
    parentOrganization: { '@id': `${SITE_BASE}/#legalservice` },
  };
}
