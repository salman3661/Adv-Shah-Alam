import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsConditions = () => {
    const lastUpdated = 'May 12, 2026';

    return (
        <>
            <Helmet>
                <title>Terms & Conditions | Advocate Md. Shah Alam</title>
                <meta name="description" content="Terms and Conditions for using advmdshahalam.me — the official website of Advocate Md. Shah Alam, trusted lawyer in Uttara, Dhaka." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://advmdshahalam.me/terms" />
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
                        Terms & Conditions
                    </h1>
                    <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
                        Last updated: {lastUpdated}
                    </p>

                    <div className="prose-legal space-y-8">
                        {/* 1 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>1. Acceptance of Terms</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                By accessing and using <strong>advmdshahalam.me</strong> ("Website"), you agree to be bound by 
                                these Terms and Conditions. If you do not agree with any part of these terms, you must not use 
                                this website. These terms apply to all visitors, users, and others who access the Website.
                            </p>
                        </div>

                        {/* 2 */}
                        <div className="glass-card p-6 md:p-8" style={{ borderLeft: '3px solid var(--accent)' }}>
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>2. Legal Disclaimer</h2>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                The information provided on this website is for <strong>general informational purposes only</strong> and 
                                does not constitute legal advice. No attorney-client relationship is formed by your use of this website 
                                or by contacting us through the website.
                            </p>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                While we strive to keep the information accurate and up-to-date, laws and regulations in Bangladesh 
                                change frequently. You should consult a qualified lawyer for advice specific to your legal situation. 
                                <strong> Do not act or refrain from acting based solely on information found on this website.</strong>
                            </p>
                        </div>

                        {/* 3 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>3. Use of Website</h2>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                You agree to use the Website only for lawful purposes and in accordance with these Terms. You agree not to:
                            </p>
                            <ul className="list-disc list-inside text-sm space-y-2" style={{ color: 'var(--text-secondary)' }}>
                                <li>Use the Website in any way that violates any applicable law or regulation.</li>
                                <li>Attempt to interfere with or disrupt the Website's functionality or security.</li>
                                <li>Copy, reproduce, or distribute any content from the Website without prior written consent.</li>
                                <li>Use any automated system (bots, scrapers) to access or collect data from the Website.</li>
                            </ul>
                        </div>

                        {/* 4 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>4. Intellectual Property</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                All content on this Website — including text, articles, graphics, logos, images, and software — 
                                is the property of Advocate Md. Shah Alam and is protected by copyright and intellectual property 
                                laws of Bangladesh. Unauthorised use or reproduction of any content is strictly prohibited.
                            </p>
                        </div>

                        {/* 5 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>5. Blog Content & Legal Articles</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                Our blog articles and legal guides are written for educational and informational purposes. 
                                They provide a general overview of Bangladeshi law and should not be considered a substitute for 
                                professional legal counsel. The applicability of legal principles discussed in our articles may 
                                vary based on individual circumstances.
                            </p>
                        </div>

                        {/* 6 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>6. Third-Party Advertisements</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                This Website displays advertisements through <strong>Google AdSense</strong>. These advertisements 
                                may use cookies and similar technologies. We do not endorse or guarantee the products or services 
                                advertised by third parties. Clicking on third-party advertisements is at your own risk. 
                                Please refer to our <Link to="/privacy-policy" className="font-medium underline" style={{ color: 'var(--accent)' }}>Privacy Policy</Link> for 
                                more information on how cookies are used.
                            </p>
                        </div>

                        {/* 7 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>7. External Links</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                Our Website may contain links to external websites that are not operated by us. We have no control 
                                over and assume no responsibility for the content, privacy policies, or practices of any third-party 
                                websites. We recommend reviewing the terms and policies of any external site you visit.
                            </p>
                        </div>

                        {/* 8 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>8. Limitation of Liability</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                To the fullest extent permitted by law, Advocate Md. Shah Alam shall not be liable for any 
                                indirect, incidental, special, consequential, or punitive damages arising from your use of or 
                                inability to use the Website, including but not limited to errors, omissions, interruptions, 
                                or loss of data.
                            </p>
                        </div>

                        {/* 9 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>9. Governing Law</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of the 
                                People's Republic of Bangladesh. Any disputes arising under these terms shall be subject to the 
                                exclusive jurisdiction of the courts of Dhaka, Bangladesh.
                            </p>
                        </div>

                        {/* 10 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>10. Changes to Terms</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                We reserve the right to modify or replace these Terms at any time. Changes will be effective 
                                immediately upon posting on this page. Your continued use of the Website after any changes 
                                constitutes acceptance of the updated terms.
                            </p>
                        </div>

                        {/* 11 - Contact */}
                        <div className="glass-card p-6 md:p-8" style={{ borderLeft: '3px solid var(--gold, var(--accent))' }}>
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>11. Contact Us</h2>
                            <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>
                                If you have any questions about these Terms and Conditions, please contact us:
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

export default TermsConditions;
