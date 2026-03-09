/**
 * src/hooks/useSettings.js
 * ─────────────────────────────────────────────────────────────────
 * React hook + context for global site settings (phone, WA, address).
 * Settings are fetched once and cached for the whole session.
 *
 * Usage in any component:
 *   const settings = useSettings();
 *   // settings.callNumber, settings.chamberAddress, etc.
 *
 * Wrap your app (in main.jsx or App.jsx):
 *   <SettingsProvider>
 *     <App />
 *   </SettingsProvider>
 * ─────────────────────────────────────────────────────────────────
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { getSiteSettings } from '../api/settings.js';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        getSiteSettings().then(setSettings);
    }, []);

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}

/**
 * Returns site settings object.
 * Returns null while loading (use nullish coalescing for fallbacks).
 */
export function useSettings() {
    return useContext(SettingsContext);
}
