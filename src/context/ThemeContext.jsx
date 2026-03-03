import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const ThemeContext = createContext();

// Reads the current theme preference without side effects
function getInitialTheme() {
    try {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') return stored;
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch (_) { }
    return 'light';
}

// Applies theme to ALL relevant DOM elements in one place — called by both
// the initial effect and every toggle so html + body always stay in sync.
function applyThemeToDom(theme) {
    const isDark = theme === 'dark';
    const html = document.documentElement;
    const body = document.body;

    // .dark class — used by Tailwind dark: variants
    html.classList.toggle('dark', isDark);

    // data-theme — used by our CSS var selectors (body[data-theme="dark"])
    body.setAttribute('data-theme', theme);

    // Also sync html data-theme so FOUC-set attribute never goes stale
    html.setAttribute('data-theme', theme);
}

export const ThemeProvider = ({ children }) => {
    const manualOverride = useRef(!!localStorage.getItem('theme'));
    const [theme, setTheme] = useState(getInitialTheme);

    // Sync to DOM whenever theme changes
    useEffect(() => {
        applyThemeToDom(theme);
        if (manualOverride.current) {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    // Track OS-level preference changes — honour only if user hasn't manually picked
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (e) => {
            if (!manualOverride.current) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

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
