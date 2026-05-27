import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
    const lastUpdated = 'May 18, 2026';

    return (
        <>
            <Helmet>
                <title>Privacy Policy | Advocate Md. Shah Alam — advmdshahalam.me</title>
                <meta name="description" content="Privacy Policy of advmdshahalam.me — how we collect, use and protect your information. Includes Google AdSense, Analytics and cookie policy disclosures." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.advmdshahalam.me/privacy-policy" />
            </Helmet>

            <section className="pt-28 pb-16" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Back link */}
                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium mb-8 opacity-70 hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--accent)' }}>
                        <ArrowLeft size={15} /> Back to Home
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Privacy Policy
                    </h1>
                    <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
                        Last updated: {lastUpdated}
                    </p>

                    <div className="prose-legal space-y-8">
                        {/* 1 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>1. Introduction</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                Welcome to <strong>advmdshahalam.me</strong> ("Website"), operated by <strong>Advocate Md. Shah Alam</strong> ("we", "us", or "our"). 
                                We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, 
                                use, disclose, and safeguard your information when you visit our website.
                            </p>
                        </div>

                        {/* 2 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>2. Information We Collect</h2>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                We may collect the following types of information:
                            </p>
                            <ul className="list-disc list-inside text-sm space-y-2" style={{ color: 'var(--text-secondary)' }}>
                                <li><strong>Personal Information:</strong> Name, phone number, email address, and any details you voluntarily provide through our contact form or WhatsApp.</li>
                                <li><strong>Automatically Collected Information:</strong> IP address, browser type, operating system, referring URLs, pages viewed, time spent on pages, and other browsing data.</li>
                                <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your experience and gather analytical data.</li>
                            </ul>
                        </div>

                        {/* 3 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>3. How We Use Your Information</h2>
                            <ul className="list-disc list-inside text-sm space-y-2" style={{ color: 'var(--text-secondary)' }}>
                                <li>To respond to your legal inquiries and consultation requests.</li>
                                <li>To improve our website content, functionality, and user experience.</li>
                                <li>To analyse website traffic and usage patterns via Google Analytics.</li>
                                <li>To display relevant advertisements through Google AdSense.</li>
                                <li>To comply with applicable laws and legal obligations.</li>
                            </ul>
                        </div>

                        {/* 4 - Google AdSense & Cookies */}
                        <div className="glass-card p-6 md:p-8" style={{ borderLeft: '3px solid var(--accent)' }}>
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>4. Google AdSense &amp; Advertising Cookies</h2>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                This website uses <strong>Google AdSense</strong>, a third-party advertising service provided by Google LLC 
                                (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA), to display advertisements. 
                                Google AdSense may use cookies, web beacons, and similar tracking technologies — including the 
                                <strong> DoubleClick DART cookie</strong> — to serve ads based on your visits to this website and 
                                other websites on the Internet.
                            </p>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                Third-party vendors and ad networks, including Google, use cookies to serve ads based on your prior 
                                visits to this website and other websites. These cookies allow Google and its partners to serve ads 
                                tailored to your interests. <strong>We do not control</strong> the cookies placed by Google AdSense 
                                and are not responsible for Google's data practices.
                            </p>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                <strong>What information may be collected by AdSense:</strong> IP address, browser type, device type, 
                                pages visited, time of visit, referring URLs, and other browsing activity.
                            </p>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                <strong>Opt-out options:</strong> You may opt out of personalised advertising by visiting{' '}
                                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
                                    className="font-medium underline" style={{ color: 'var(--accent)' }}>
                                    Google Ads Settings
                                </a>
                                {' '}or the{' '}
                                <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer"
                                    className="font-medium underline" style={{ color: 'var(--accent)' }}>
                                    Digital Advertising Alliance opt-out
                                </a>
                                . You can also manage cookies through your browser settings. Note that opting out of personalised 
                                ads does not prevent you from seeing ads — it means ads will not be personalised to your interests.
                            </p>
                        </div>

                        {/* 5 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>5. Google Analytics</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                We use <strong>Google Analytics</strong> to understand how visitors interact with our website. 
                                Google Analytics collects information such as how often users visit, what pages they visit, 
                                and what other sites they visited before coming to our website. We use this information solely to 
                                improve our website. Google Analytics uses cookies but does not collect personally identifiable information. 
                                You can learn more about how Google uses data at{' '}
                                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer"
                                    className="font-medium underline" style={{ color: 'var(--accent)' }}>
                                    Google's Privacy & Terms
                                </a>.
                            </p>
                        </div>

                        {/* 6 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>6. Third-Party Links</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                Our website may contain links to third-party websites (e.g., Facebook, WhatsApp, Google Maps). 
                                We are not responsible for the privacy practices or content of these external sites. 
                                We encourage you to review the privacy policies of any third-party sites you visit.
                            </p>
                        </div>

                        {/* 7 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>7. Data Security</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                We implement appropriate technical and organisational security measures to protect your personal 
                                information from unauthorised access, alteration, disclosure, or destruction. However, no method 
                                of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </div>

                        {/* 8 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>8. Children's Privacy</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                Our website is not intended for children under the age of 13. We do not knowingly collect 
                                personal information from children. If we learn that we have collected personal information from 
                                a child under 13, we will promptly delete that information.
                            </p>
                        </div>

                        {/* 9 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>9. Your Rights</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict the 
                                processing of your personal data. To exercise any of these rights, please contact us using the 
                                details provided below.
                            </p>
                        </div>

                        {/* 10 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>10. Changes to This Policy</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                We may update this Privacy Policy from time to time. Any changes will be posted on this page 
                                with an updated "Last updated" date. We encourage you to review this page periodically.
                            </p>
                        </div>

                        {/* 11 - Contact */}
                        <div className="glass-card p-6 md:p-8" style={{ borderLeft: '3px solid var(--gold, var(--accent))' }}>
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>11. Contact Us</h2>
                            <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                                <li><strong>Name:</strong> Advocate Md. Shah Alam</li>
                                <li><strong>Email:</strong> contact@advmdshahalam.me</li>
                                <li><strong>Phone:</strong> +880 1712-655546</li>
                                <li><strong>Address:</strong> Mantrust Nazma Monzil, Sector 12, Uttara West, Dhaka-1230</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PrivacyPolicy;
