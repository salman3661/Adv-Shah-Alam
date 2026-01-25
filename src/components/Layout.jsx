import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

const Layout = ({ children }) => {
    return (
        <div className="bg-soft-gray dark:bg-navy min-h-screen text-navy dark:text-white font-sans selection:bg-gold selection:text-white transition-colors duration-300 flex flex-col">
            <Header />
            <main className="flex-grow pt-24 sm:pt-28">
                {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};

export default Layout;
