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
                className="pt-28 min-h-screen bg-gradient-to-br from-soft-white via-navy-light/10 to-soft-white dark:from-navy-dark dark:via-navy dark:to-navy-dark"
            >
                <div className="container mx-auto px-6 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy dark:text-white mb-4">
                        Full Professional History
                    </h1>
                    <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
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
