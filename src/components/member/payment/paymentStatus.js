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
