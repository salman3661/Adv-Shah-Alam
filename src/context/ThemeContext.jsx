import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize theme: check localStorage first, then system preference
    const [theme, setTheme] = useState(() => {
        // Check if there's a stored preference (manual override)
        const stored = localStorage.getItem('theme');
        if (stored) {
            return stored;
        }
        // Fall back to system preference
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    // Listen for system preference changes (only if no manual override)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            // Only update if user hasn't manually set a preference
            const stored = localStorage.getItem('theme');
            if (!stored) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Apply theme: data-theme on body (CSS vars) + .dark on html (Tailwind dark: variants)
    useEffect(() => {
        const html = window.document.documentElement;
        const body = window.document.body;

        if (theme === 'dark') {
            html.classList.add('dark');
            body.setAttribute('data-theme', 'dark');
        } else {
            html.classList.remove('dark');
            body.setAttribute('data-theme', 'light');
        }

        // Persist the theme choice
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
