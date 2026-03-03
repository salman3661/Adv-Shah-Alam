import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Track whether user has manually toggled (vs auto-detected from system)
    const manualOverride = useRef(!!localStorage.getItem('theme'));

    // Initialize theme: check localStorage first, then system preference
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    // Listen for system preference changes — only applies if user has NOT manually overridden
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (!manualOverride.current) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Apply theme to DOM: data-theme on body (CSS vars) + .dark on html (Tailwind dark: variants)
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        if (theme === 'dark') {
            html.classList.add('dark');
            body.setAttribute('data-theme', 'dark');
        } else {
            html.classList.remove('dark');
            body.setAttribute('data-theme', 'light');
        }
        // Only persist to localStorage if user has manually chosen
        if (manualOverride.current) {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        manualOverride.current = true;
        setTheme((prev) => {
            const next = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', next);
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
