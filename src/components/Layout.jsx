import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import MobileCallButton from './MobileCallButton';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen font-sans flex flex-col transition-colors duration-300"
            style={{ background: 'var(--bg)', color: 'var(--text)' }}>
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
            <MobileCallButton />
        </div>
    );
};

export default Layout;
