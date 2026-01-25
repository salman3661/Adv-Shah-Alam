import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-navy py-12 border-t border-slate-200 dark:border-white/5 transition-colors">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="font-serif font-bold text-xl text-navy dark:text-white">Adv. Md. Shah Alam</p>
                    <p className="text-slate-500 text-sm">Supreme Court of Bangladesh</p>
                </div>

                <div className="flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    <a href="#home" className="hover:text-gold transition-colors">Home</a>
                    <a href="#expertise" className="hover:text-gold transition-colors">Practice</a>
                    <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
                </div>

                <div className="text-slate-400 text-xs">
                    <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
