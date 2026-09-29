// Only public session metadata lives in memory. The browser owns the HttpOnly cookie.
export function createSessionStore(api, timers = globalThis) {
    let state = { user: null, loading: true, error: null };
    let revision = 0;
    let changingSession = false;
    let expiryTimer;
    const listeners = new Set();
    const emit = (next) => {
        state = next;
        listeners.forEach((listener) => listener(state));
    };
    const clear = () => {
        revision += 1;
        timers.clearTimeout(expiryTimer);
        emit({ user: null, loading: false, error: null });
    };
    const accept = (data) => {
        timers.clearTimeout(expiryTimer);
        const remaining = Date.parse(data.expiresAt) - Date.now();
        if (!data.id || !data.role || !(remaining > 0)) {
            clear();
            return;
        }
        const user = {
            id: data.id,
            role: data.role,
            expiresAt: data.expiresAt,
        };
        emit({ user, loading: false, error: null });
        expiryTimer = timers.setTimeout(clear, remaining);
    };
    return {
        getSnapshot: () => state,
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        clear,
        async refresh() {
            if (changingSession) return;
            const current = ++revision;
            try {
                const response = await api.get('/session');
                if (current === revision) accept(response.data.data);
            } catch (error) {
                if (current !== revision) return;
                if (error.response?.status === 401) clear();
                else
                    emit({
                        ...state,
                        loading: false,
                        error: 'Istunnon tarkistus epäonnistui. Yritä uudelleen.',
                    });
            }
        },
        async login(credentials) {
            const current = ++revision;
            changingSession = true;
            try {
                const response = await api.post('/login', credentials);
                if (current === revision && response.data.success)
                    accept(response.data.data);
                return response;
            } finally {
                changingSession = false;
            }
        },
        async logout() {
            revision += 1;
            changingSession = true;
            // Keep the UI signed in if server-side revocation fails, so it can be retried.
            try {
                await api.post('/logout');
                clear();
            } finally {
                changingSession = false;
            }
        },
        dispose() {
            revision += 1;
            timers.clearTimeout(expiryTimer);
            listeners.clear();
        },
    };
}
