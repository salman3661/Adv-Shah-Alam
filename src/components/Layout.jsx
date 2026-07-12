import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import MobileCallButton from './MobileCallButton';

const BASE = 'https://www.advmdshahalam.me';

const attorneySchema = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    '@id': `${BASE}/#attorney`,
    name: 'Advocate Md. Shah Alam',
    alternateName: 'এডভোকেট মো. শাহ আলম',
    url: BASE,
    image: `${BASE}/images/hero/hero-md-shah-alam.png`,
    telephone: '+8801712122102',
    email: 'contact@advmdshahalam.me',
    description: 'Advocate Md. Shah Alam is a Supreme Court lawyer in Bangladesh with 10+ years of experience in Criminal, Family, Land, Company, and Tax Law. Based in Uttara, Dhaka.',
    priceRange: '৳৳',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'House 26, Road 7, Sector 3',
        addressLocality: 'Uttara',
        addressRegion: 'Dhaka',
        postalCode: '1230',
        addressCountry: 'BD',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 23.8759,
        longitude: 90.3795,
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '18:00',
        },
    ],
    areaServed: [
        { '@type': 'City', name: 'Uttara' },
        { '@type': 'City', name: 'Dhaka' },
        { '@type': 'City', name: 'Gazipur' },
        { '@type': 'Country', name: 'Bangladesh' },
    ],
    knowsAbout: [
        'Criminal Law', 'Cyber Crime Law', 'Family Law', 'Divorce Law',
        'Land Law', 'Property Law', 'Company Law', 'Corporate Law',
        'Tax Law', 'VAT Law', 'Bail Applications', 'Writ Petitions',
        'Supreme Court of Bangladesh',
    ],
    sameAs: [
        'https://www.facebook.com/advmdshahalam',
        'https://www.facebook.com/advmd.shahalamfb',
    ],
};

const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    name: 'Advocate Md. Shah Alam — Law Chambers',
    alternateName: 'এডভোকেট মো. শাহ আলম — আইন চেম্বার',
    url: BASE,
    publisher: { '@id': `${BASE}/#attorney` },
    inLanguage: ['en', 'bn'],
    potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE}/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
    },
};

/* ── Person schema — for Knowledge Graph ── */
const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE}/#person`,
    name: 'Md. Shah Alam',
    givenName: 'Md. Shah Alam',
    additionalName: 'Shah Alam',
    alternateName: ['Advocate Shah Alam', 'এডভোকেট মো. শাহ আলম', 'Adv. Md. Shah Alam'],
    url: `${BASE}/advocate-md-shah-alam`,
    image: {
        '@type': 'ImageObject',
        url: `${BASE}/images/hero/hero-md-shah-alam.png`,
        width: 600,
        height: 750,
    },
    jobTitle: 'Advocate, Supreme Court of Bangladesh',
    description: 'Advocate Md. Shah Alam is a Supreme Court Advocate of Bangladesh with 10+ years of experience. Former Assistant Public Prosecutor at Metro Sessions Court, Dhaka. Specialises in Criminal Law, Family Law, Land Law, Company Law and Tax Law. Chamber in Uttara, Dhaka.',
    knowsAbout: [
        'Criminal Law Bangladesh', 'Bail Law Bangladesh', 'Divorce Law Bangladesh',
        'Family Law Bangladesh', 'Land Law Bangladesh', 'Property Law Bangladesh',
        'Company Law Bangladesh', 'Tax Law Bangladesh', 'Cyber Law Bangladesh',
        'Writ Petitions Bangladesh', 'Supreme Court of Bangladesh',
    ],
    nationality: { '@type': 'Country', name: 'Bangladesh' },
    worksFor: {
        '@type': 'LegalService',
        '@id': `${BASE}/#lawchambers`,
        name: 'Advocate Md. Shah Alam Law Chambers',
        url: BASE,
    },
    alumniOf: [
        {
            '@type': 'CollegeOrUniversity',
            name: 'Dhaka International University',
            sameAs: 'https://www.diu.ac',
        },
        {
            '@type': 'CollegeOrUniversity',
            name: 'Metro Police Ideal Law College',
            address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
        },
        {
            '@type': 'CollegeOrUniversity',
            name: 'Gazipur Law College',
            address: { '@type': 'PostalAddress', addressLocality: 'Gazipur', addressCountry: 'BD' },
        },
        {
            '@type': 'CollegeOrUniversity',
            name: 'Asian University of Bangladesh',
            sameAs: 'https://www.aub.edu.bd',
        },
    ],
    memberOf: [
        {
            '@type': 'Organization',
            name: 'Supreme Court Bar Association of Bangladesh',
        },
        {
            '@type': 'Organization',
            name: 'Bangladesh Bar Council',
            sameAs: 'https://www.bangladeshbarcouncil.org',
        },
    ],
    hasOccupation: {
        '@type': 'Occupation',
        name: 'Lawyer',
        occupationLocation: { '@type': 'Country', name: 'Bangladesh' },
        description: 'Supreme Court Advocate specialising in criminal, family, property and corporate law',
        skills: 'Criminal Defence, Bail Applications, Divorce & Family Law, Land & Property Disputes, Corporate Law, Tax Law, Writ Petitions',
    },
    sameAs: [
        'https://www.facebook.com/advmdshahalam',
        'https://www.facebook.com/advmd.shahalamfb',
        `${BASE}/advocate-md-shah-alam`,
    ],
};

/* ── LegalService / LocalBusiness schema ── */
const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    '@id': `${BASE}/#lawchambers`,
    name: 'Advocate Md. Shah Alam Law Chambers',
    alternateName: 'এডভোকেট মো. শাহ আলম আইন চেম্বার',
    url: BASE,
    logo: `${BASE}/images/logo.png`,
    image: `${BASE}/images/hero/hero-md-shah-alam.png`,
    telephone: '+8801712122102',
    email: 'contact@advmdshahalam.me',
    description: 'Law Chambers of Advocate Md. Shah Alam — Supreme Court Advocate, Bangladesh. 10+ years experience. Criminal Law, Family Law, Land Law, Company Law & Tax Law. Located in Uttara, Dhaka.',
    foundingDate: '2015',
    priceRange: '৳৳',
    currenciesAccepted: 'BDT',
    paymentAccepted: 'Cash, Mobile Banking',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'House 26, Road 7, Sector 3',
        addressLocality: 'Uttara',
        addressRegion: 'Dhaka',
        postalCode: '1230',
        addressCountry: 'BD',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 23.8759,
        longitude: 90.3795,
    },
    hasMap: 'https://maps.google.com/?q=23.8759,90.3795',
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '18:00',
        },
    ],
    areaServed: [
        { '@type': 'City', name: 'Uttara, Dhaka' },
        { '@type': 'City', name: 'Dhaka' },
        { '@type': 'Country', name: 'Bangladesh' },
    ],
    serviceType: [
        'Criminal Lawyer', 'Bail Lawyer', 'Divorce Lawyer', 'Family Lawyer',
        'Land Lawyer', 'Property Lawyer', 'Corporate Lawyer', 'Tax Lawyer',
        'Supreme Court Lawyer Bangladesh',
    ],
    employee: { '@id': `${BASE}/#person` },
    sameAs: [
        'https://www.facebook.com/advmdshahalam',
        'https://www.facebook.com/advmd.shahalamfb',
    ],
};

/* ── BreadcrumbList for homepage ── */
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/services` },
        { '@type': 'ListItem', position: 3, name: 'Blog', item: `${BASE}/blog` },
        { '@type': 'ListItem', position: 4, name: 'Contact', item: `${BASE}/contact` },
    ],
};

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen font-sans flex flex-col transition-colors duration-300"
            style={{ background: 'var(--bg)', color: 'var(--text)' }}>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(legalServiceSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(attorneySchema)}</script>
                <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </Helmet>
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
            <MobileCallButton />
        </div>
    );
};

export default Layout;
