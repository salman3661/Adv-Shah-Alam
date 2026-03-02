import React from 'react';
import Timeline from '../components/Timeline';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Education = () => {
    return (
        <>
            <Helmet>
                <title>Education & Career Journey | Adv. Md. Shah Alam</title>
                <meta name="description" content="Complete educational background and professional career timeline of Advocate Md. Shah Alam." />
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
                        Full Professional History
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
