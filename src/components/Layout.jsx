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
    description: 'Advocate Md. Shah Alam is a Supreme Court lawyer in Bangladesh with 20+ years of experience in Criminal, Family, Land, Company, and Tax Law. Based in Uttara, Dhaka.',
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

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen font-sans flex flex-col transition-colors duration-300"
            style={{ background: 'var(--bg)', color: 'var(--text)' }}>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(attorneySchema)}</script>
                <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
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
