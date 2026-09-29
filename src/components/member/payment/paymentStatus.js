export async function fetchPaymentStatus(api, sessionId, signal) {
    const missingReference = {
        state: 'error',
        message:
            'Avaa maksun tiedot samassa selaimessa, jossa aloitit maksun. Saat kuitin sähköpostiisi.',
    };
    if (!sessionId) return missingReference;
    try {
        const response = await api.get('/pay/session-status', {
            params: { session_id: sessionId },
            withCredentials: true,
            signal,
        });
        return response.data;
    } catch (error) {
        if (
            ['INVALID_PAYMENT', 'PAYMENT_NOT_FOUND'].includes(
                error.response?.data?.error?.code
            )
        )
            return missingReference;
        throw error;
    }
}

export async function pollPaymentStatus(
    fetchStatus,
    {
        signal,
        wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
        attempts = 15,
    } = {}
) {
    for (
        let attempt = 0;
        attempt < attempts && !signal?.aborted;
        attempt += 1
    ) {
        const result = await fetchStatus();
        if (result.state !== 'pending' || signal?.aborted) return result;
        if (attempt < attempts - 1) await wait(4000);
    }
    return {
        state: 'pending',
        message:
            'Maksun vahvistusta odotetaan vielä. Voit tarkistaa tilanteen uudelleen myöhemmin.',
    };
}
