import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Scale, AlertCircle, FileText } from 'lucide-react';

const TermsConditions = () => {
    const lastUpdated = 'September 2026';

    return (
        <>
            <Helmet>
                <title>Terms of Service (ব্যবহারের শর্তাবলী) | Advocate Md. Shah Alam</title>
                <meta name="description" content="Terms of Service & Engagement for advmdshahalam.me — consultation boundaries, retainer conditions, payment policies, and Dhaka court jurisdiction." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.advmdshahalam.me/terms-of-service" />
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
                        Terms of Service (ব্যবহারের শর্তাবলী)
                    </h1>
                    <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
                        Official Terms of Website Use and Professional Legal Engagement &middot; Last updated: {lastUpdated}
                    </p>

                    <div className="prose-legal space-y-8">
                        {/* 1 */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                                <FileText size={18} className="text-amber-500" /> 1. Acceptance of Terms
                            </h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                By accessing, reading, or submitting inquiries through <strong>advmdshahalam.me</strong> ("Website"), you unconditionally agree to be bound by these Terms of Service, all applicable laws and regulations of Bangladesh, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                            </p>
                        </div>

                        {/* 2 - Consultation Boundaries */}
                        <div className="glass-card p-6 md:p-8" style={{ borderLeft: '4px solid var(--accent)' }}>
                            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                                <Scale size={18} className="text-amber-500" /> 2. Consultation Boundaries &amp; No Attorney-Client Relationship
                            </h2>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                <strong>General Informational Purpose Only:</strong> The legal articles, statutory breakdowns, court fee summaries, and guides published on this Website are prepared exclusively for public legal literacy and general education. None of the content constitutes formal legal counsel or judicial opinion.
                            </p>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                <strong>No Attorney-Client Privilege via Electronic Contact:</strong> Sending an inquiry via phone call, WhatsApp message, contact form, or email does <em>not</em> form an attorney-client relationship. An attorney-client relationship with Advocate Md. Shah Alam is formally established <strong>only</strong> when:
                            </p>
                            <ul className="list-disc list-inside text-sm space-y-1.5 pl-2 mb-3" style={{ color: 'var(--text-secondary)' }}>
                                <li>A mutual in-person or verified virtual legal consultation has occurred;</li>
                                <li>A comprehensive conflict-of-interest check has been completed and cleared; and</li>
                                <li>A formal Vakalatnama (পাওয়ার অব এটর্নি / ওকালতনামা) or written Engagement Agreement is executed by both parties.</li>
                            </ul>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                Confidential or time-sensitive court materials should never be sent via unencrypted forms or unsolicited messages prior to formal representation.
                            </p>
                        </div>

                        {/* 3 - Retainer Conditions */}
                        <div className="glass-card p-6 md:p-8" style={{ borderLeft: '4px solid #10b981' }}>
                            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                                <ShieldCheck size={18} className="text-emerald-500" /> 3. Retainer Conditions &amp; Professional Representation
                            </h2>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                Formal legal representation before the Supreme Court of Bangladesh (Appellate Division &amp; High Court Division), Dhaka Metropolitan Sessions Court, Chief Metropolitan Magistrate (CMM) Court, Land Survey Tribunal, or Family Courts requires:
                            </p>
                            <ul className="list-disc list-inside text-sm space-y-1.5 pl-2" style={{ color: 'var(--text-secondary)' }}>
                                <li>Submission of authenticated case records, certified copies (সহিমুহুরি নকল), and relevant evidence.</li>
                                <li>Execution of Vakalatnama by the client or authorized legal guardian.</li>
                                <li>Agreement to the structured stage-wise schedule of court appearances, motion drafting, and filings.</li>
                                <li>Advocate Md. Shah Alam retains the professional discretion to decline representation if there is a conflict of interest, violation of Bar Council canons of professional conduct, or lack of factual substantiation.</li>
                            </ul>
                        </div>

                        {/* 4 - Payment Policies */}
                        <div className="glass-card p-6 md:p-8" style={{ borderLeft: '4px solid #f59e0b' }}>
                            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                                <AlertCircle size={18} className="text-amber-500" /> 4. Payment Policies &amp; Financial Terms
                            </h2>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                <strong>Consultation Fees:</strong> Dedicated in-chamber and structured telephonic consultations are subject to consultation fees discussed prior to the appointment.
                            </p>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                <strong>Retainer and Litigation Disbursements:</strong> Legal representation fees, statutory court fees, commissioner expenses, stamp duties, and process service disbursements must be settled in accordance with the agreed written schedule.
                            </p>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                <strong>No Outcome Contingency or Guarantees:</strong> Under the Bangladesh Bar Council Canons of Professional Conduct and Etiquette, advocates are strictly prohibited from guaranteeing court outcomes or charging contingency percentages on judgments. All professional services reflect diligence, research, and advocacy, not predetermined court results.
                            </p>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                <strong>Payment Receipts:</strong> All payments made via official bank transfer, verified mobile banking (bKash/Nagad), or cash at the Uttara or Judge Court chamber are formally acknowledged with an official receipt.
                            </p>
                        </div>

                        {/* 5 - Intellectual Property */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>5. Intellectual Property &amp; Content Use</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                All original analysis, legal commentaries, visual diagrams, flowcharts, calculators, and written articles on this Website are the exclusive intellectual property of Advocate Md. Shah Alam. No content may be copied, redistributed, scraped, or republished in digital or print form without express prior written permission.
                            </p>
                        </div>

                        {/* 6 - Third-Party Ads */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>6. Third-Party Advertisements &amp; Google AdSense</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                This website may display contextual advertisements managed by <strong>Google AdSense</strong>. Third-party advertisers may deploy tracking technologies (such as DoubleClick DART cookies) to serve relevant advertisements. We do not endorse or guarantee third-party commercial products. For further privacy opt-out information, review our <Link to="/privacy-policy" className="underline font-semibold" style={{ color: 'var(--accent)' }}>Privacy Policy</Link>.
                            </p>
                        </div>

                        {/* 7 - Limitation of Liability */}
                        <div className="glass-card p-6 md:p-8">
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>7. Limitation of Liability</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                Under no circumstances shall Advocate Md. Shah Alam, his associates, or chamber staff be liable for any consequential, indirect, special, or incidental damages arising out of the use, interpretation, or inability to use the legal articles or materials on this Website.
                            </p>
                        </div>

                        {/* 8 - Exclusive Dhaka Jurisdiction */}
                        <div className="glass-card p-6 md:p-8" style={{ borderLeft: '4px solid #ef4444' }}>
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>8. Governing Law &amp; Exclusive Dhaka Court Jurisdiction</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                These Terms of Service and any dispute, controversy, or claim arising out of or related to this Website or our professional services shall be governed exclusively by the laws of the People's Republic of Bangladesh.
                            </p>
                            <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
                                <strong>Exclusive Jurisdiction:</strong> Any legal action or judicial proceeding shall be instituted solely in the competent courts situated in <strong>Dhaka, Bangladesh</strong>.
                            </p>
                        </div>

                        {/* 9 - Contact */}
                        <div className="glass-card p-6 md:p-8" style={{ borderLeft: '4px solid var(--gold, var(--accent))' }}>
                            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>9. Chamber Contact &amp; Inquiries</h2>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                For formal retainer questions, chamber appointments, or legal verification, contact our offices:
                            </p>
                            <ul className="text-sm space-y-1.5" style={{ color: 'var(--text-secondary)' }}>
                                <li><strong>Senior Advocate:</strong> Advocate Md. Shah Alam (Supreme Court &amp; Dhaka Bar)</li>
                                <li><strong>Direct Phone:</strong> +880 1712-655546</li>
                                <li><strong>Emergency WhatsApp:</strong> +880 1955-802007</li>
                                <li><strong>Chamber Email:</strong> contact@advmdshahalam.me</li>
                                <li><strong>Uttara Chamber:</strong> House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230</li>
                                <li><strong>Court Chamber:</strong> Lawyers Association Building, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TermsConditions;
