import api from './api';
import { createSessionStore } from './sessionStore';

export const sessionStore = createSessionStore(api);
export const getCurrentUser = () => sessionStore.getSnapshot().user;

api.interceptors.response.use(undefined, (error) => {
    if (
        error.response?.status === 401 &&
        /^\/(member|admin)(\/|$)/.test(error.config?.url || '')
    ) {
        sessionStore.clear();
    }
    return Promise.reject(error);
});

export function clearLegacyCookies() {
    for (const name of ['jasenrekisteri-token', 'role', 'id']) {
        document.cookie = `${name}=; Max-Age=0; Path=/`;
    }
}
