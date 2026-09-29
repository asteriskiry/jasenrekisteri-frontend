import React, { createContext, useContext, useEffect, useState } from 'react';
import { clearLegacyCookies, sessionStore } from '../utils/auth';

export const AuthContext = createContext({
    user: null,
    loading: true,
    error: null,
});
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [state, setState] = useState(sessionStore.getSnapshot());
    useEffect(() => {
        const unsubscribe = sessionStore.subscribe(setState);
        clearLegacyCookies();
        sessionStore.refresh();
        const refresh = () => sessionStore.refresh();
        window.addEventListener('focus', refresh);
        return () => {
            unsubscribe();
            window.removeEventListener('focus', refresh);
        };
    }, []);
    return (
        <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    );
}
