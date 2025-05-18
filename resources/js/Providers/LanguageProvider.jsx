import { createContext, useContext } from 'react';

const LanguageContext = createContext(null);

export function useLanguages() {
    return useContext(LanguageContext);
}

export default function LanguageProvider({ value, children }) {
    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}
