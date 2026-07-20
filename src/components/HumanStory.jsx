import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Scale, Users, BookOpen } from 'lucide-react';
import { waLink } from '../data/contactInfo';

const commitmentsEn = [
    {
        icon: Heart,
        title: 'Free Initial Consultation',
        desc: 'We offer a free first consultation for families facing financial hardship. Everyone deserves access to justice.',
        color: 'rgba(239,68,68,0.08)',
        borderColor: 'rgba(239,68,68,0.2)',
        iconColor: '#dc2626',
    },
    {
        icon: Users,
        title: 'Community Legal Aid',
        desc: 'We run pro bono legal aid camps and educate everyday citizens on their fundamental legal rights.',
        color: 'rgba(26,63,191,0.08)',
        borderColor: 'rgba(26,63,191,0.2)',
        iconColor: 'var(--accent)',
    },
    {
        icon: BookOpen,
        title: 'Mentoring Young Lawyers',
        desc: 'I mentor junior advocates entering the bar. A stronger legal profession leads to a stronger justice system.',
        color: 'rgba(198,167,94,0.08)',
        borderColor: 'rgba(198,167,94,0.2)',
        iconColor: '#b45309',
    },
];

const commitmentsBn = [
    {
        icon: Heart,
        title: 'বিনামূল্যে প্রাথমিক পরামর্শ',
        desc: 'আর্থিক সংকটে থাকা পরিবারের জন্য আমরা প্রথম পরামর্শ বিনামূল্যে দিই। কারণ ন্যায়বিচার পাওয়ার অধিকার সবার আছে।',
        color: 'rgba(239,68,68,0.08)',
        borderColor: 'rgba(239,68,68,0.2)',
        iconColor: '#dc2626',
    },
    {
        icon: Users,
        title: 'সমাজসেবা ও আইনি সচেতনতা',
        desc: 'আমরা নিয়মিত বিনামূল্যে আইনি সহায়তা শিবির পরিচালনা করি এবং সাধারণ মানুষকে তাদের আইনি অধিকার সম্পর্কে সচেতন করি।',
        color: 'rgba(26,63,191,0.08)',
        borderColor: 'rgba(26,63,191,0.2)',
        iconColor: 'var(--accent)',
    },
    {
        icon: BookOpen,
        title: 'নতুন আইনজীবীদের পরামর্শদাতা',
        desc: 'আইন পেশায় নতুনদের গাইড করা আমার দায়িত্ব মনে করি। কারণ একটি শক্তিশালী আইন পেশা মানে শক্তিশালী বিচার ব্যবস্থা।',
        color: 'rgba(198,167,94,0.08)',
        borderColor: 'rgba(198,167,94,0.2)',
        iconColor: '#b45309',
    },
];

const HumanStory = ({ lang = 'en' }) => {
    const isBn = lang === 'bn';
    const commitments = isBn ? commitmentsBn : commitmentsEn;

    return (
        <section
            id="human-story"
            className="py-20 relative overflow-hidden"
            style={{ background: 'var(--surface)' }}
        >
            {/* Background glow */}
            <div
                className="absolute left-0 bottom-0 w-1/3 h-1/2 rounded-full -z-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%)' }}
            />

            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="label-accent block mb-3"
                    >
                        {isBn ? 'শুধু একজন আইনজীবী নয়' : 'More Than a Lawyer'}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-serif font-bold mb-3"
                        style={{ color: 'var(--text)', fontFamily: isBn ? 'inherit' : "'Playfair Display', serif" }}
                    >
                        {isBn ? 'একজন মানুষ, একটি প্রতিশ্রুতি' : 'A Person, A Commitment'}
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="w-24 h-1 mx-auto rounded-full" style={{ background: 'var(--accent)' }}
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
                        className="text-sm mt-5 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}
                    >
                        {isBn 
                            ? 'আমি বিশ্বাস করি — একজন ভালো আইনজীবী শুধু আদালতে নয়, সমাজেও পরিবর্তন আনতে পারেন।'
                            : 'I believe a good lawyer can make a difference not just in court, but in the lives of real people.'}
                    </motion.p>
                </div>

                {/* Commitment cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-14">
                    {commitments.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="rounded-2xl p-6"
                            style={{ background: item.color, border: `1px solid ${item.borderColor}` }}
                        >
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                                style={{ background: 'var(--card-bg)', color: item.iconColor }}
                            >
                                <item.icon size={22} />
                            </div>
                            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text)' }}>
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Personal letter / promise card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.3 }}
                    className="rounded-2xl p-8 md:p-12 text-center"
                    style={{
                        background: 'linear-gradient(135deg, rgba(26,63,191,0.07) 0%, rgba(198,167,94,0.05) 100%)',
                        border: '1px solid rgba(26,63,191,0.15)',
                    }}
                >
                    <Scale size={36} className="mx-auto mb-5" style={{ color: 'var(--accent)', opacity: 0.7 }} />
                    <blockquote
                        className="text-lg md:text-xl font-serif italic leading-relaxed mb-6 max-w-3xl mx-auto"
                        style={{ color: 'var(--text-2)', fontFamily: isBn ? 'inherit' : "'Playfair Display', serif" }}
                    >
                        {isBn 
                            ? '"আমার কাছে প্রতিটি মামলা শুধু একটি কেস নম্বর নয় — এটি একটি মানুষের জীবনের গুরুত্বপূর্ণ অধ্যায়। আপনি যখন আমাকে বিশ্বাস করে আসেন, আমি সেই বিশ্বাসের প্রতি সৎ থাকার শপথ নিই।"'
                            : '"To me, a case is never just a case number — it is a human life. When you place your trust in me, I pledge to defend that trust with absolute dedication."'}
                    </blockquote>
                    <div className="mb-6">
                        <span style={{
                            fontFamily: isBn ? "'Noto Serif Bengali', serif" : "'Dancing Script', 'Brush Script MT', cursive",
                            fontSize: isBn ? '1.4rem' : '1.6rem',
                            color: 'var(--accent)',
                            fontWeight: 600,
                            display: 'block',
                            lineHeight: 1.3,
                        }}>
                            {isBn ? 'এডভোকেট মোঃ শাহ আলম' : 'Md. Shah Alam'}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                            {isBn ? 'অ্যাডভোকেট, বাংলাদেশ সুপ্রিম কোর্ট' : 'Advocate, Supreme Court of Bangladesh'}
                        </span>
                    </div>
                    <a
                        href={waLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2 py-3.5 px-8 shadow-lg text-sm"
                    >
                        <Heart size={16} /> {isBn ? 'আমার সাথে সরাসরি কথা বলুন' : 'Speak with Me Directly'}
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default HumanStory;
