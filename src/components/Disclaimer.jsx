import React from 'react';
import { AlertTriangle, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Disclaimer — shown at the top of every blog post.
 *
 * Google requires legal/medical/financial content sites to clearly
 * state that articles are informational only, not professional advice.
 * This also satisfies AdSense's "site policies" content requirement.
 */
const Disclaimer = ({ lang = 'en' }) => {
    if (lang === 'bn') {
        return (
            <div
                role="note"
                aria-label="আইনি দাবিত্যাগ"
                style={{
                    background: 'linear-gradient(135deg, rgba(245,166,35,0.08) 0%, rgba(245,166,35,0.04) 100%)',
                    border: '1px solid rgba(245,166,35,0.35)',
                    borderLeft: '4px solid #f5a623',
                    borderRadius: '0.75rem',
                    padding: '1rem 1.25rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                }}
            >
                <AlertTriangle size={18} style={{ color: '#f5a623', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '2px' }}>
                        ⚠️ আইনি দাবিত্যাগ (Legal Disclaimer)
                    </strong>
                    এই নিবন্ধটি শুধুমাত্র সাধারণ তথ্যের উদ্দেশ্যে প্রদান করা হয়েছে এবং এটি আইনি পরামর্শ নয়।
                    আপনার নির্দিষ্ট পরিস্থিতির জন্য একজন যোগ্য আইনজীবীর সাথে পরামর্শ করুন।
                    সরাসরি পরামর্শের জন্য{' '}
                    <a href="tel:+8801712655546" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                        +880 1712-655546
                    </a>{' '}
                    নম্বরে অ্যাডভোকেট মো. শাহ আলমের সাথে যোগাযোগ করুন।
                </div>
            </div>
        );
    }

    return (
        <div
            role="note"
            aria-label="Legal disclaimer"
            style={{
                background: 'linear-gradient(135deg, rgba(245,166,35,0.08) 0%, rgba(245,166,35,0.04) 100%)',
                border: '1px solid rgba(245,166,35,0.35)',
                borderLeft: '4px solid #f5a623',
                borderRadius: '0.75rem',
                padding: '1rem 1.25rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
            }}
        >
            <Scale size={18} style={{ color: '#f5a623', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '2px' }}>
                    Legal Disclaimer
                </strong>
                This article provides <strong>general legal information only</strong> and does not constitute legal advice.
                Laws and procedures may have changed — always verify current law. For advice specific to your situation,
                consult a qualified lawyer directly.{' '}
                <Link to="/contact" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                    Contact Advocate Md. Shah Alam
                </Link>{' '}
                at{' '}
                <a href="tel:+8801712655546" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                    +880 1712-655546
                </a>.
            </div>
        </div>
    );
};

export default Disclaimer;
