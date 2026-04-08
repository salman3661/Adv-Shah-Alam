import React from 'react';
import Timeline from '../components/Timeline';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Education = () => {
    return (
        <>
            <Helmet>
                <title>Advocate Md. Shah Alam – Career, Education &amp; Legal Journey | Lawyer in Bangladesh</title>
                <meta name="description" content="Explore the education, career timeline and professional milestones of Advocate Md. Shah Alam – LL.M lawyer practising at the Supreme Court of Bangladesh from Uttara, Dhaka." />
                <link rel="canonical" href="https://www.advmdshahalam.me/education" />
                <meta property="og:title" content="Advocate Md. Shah Alam – Career, Education &amp; Legal Journey | Lawyer in Bangladesh" />
                <meta property="og:description" content="Explore the education, career timeline and professional milestones of Advocate Md. Shah Alam – LL.M lawyer practising at the Supreme Court of Bangladesh from Uttara, Dhaka." />
                <meta property="og:url" content="https://www.advmdshahalam.me/education" />
                <meta property="og:type" content="profile" />
                <meta property="og:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
            </Helmet>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-28 min-h-screen"
                style={{ background: 'var(--bg)' }}
            >
                <div className="container mx-auto px-6 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Advocate Md. Shah Alam – Career &amp; Education Journey
                    </h1>
                    <p className="max-w-2xl mx-auto"
                        style={{ color: 'var(--text-secondary)' }}>
                        A comprehensive timeline of academic achievements, professional milestones, and legal service to the nation.
                    </p>
                </div>

                {/* Reuse Timeline component with full data */}
                <Timeline isHome={false} />
            </motion.div>
        </>
    );
};

export default Education;
