import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import api from '../../../utils/api';
import { getCookie } from '../../../utils/cookies';

export default function BanksComponent({ productId, paymentToken, memberId }) {
    const [error, setError] = useState('');
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let active = true;
        const key = `checkout:${memberId || getCookie('id')}:${productId}`;
        async function checkout() {
            try {
                const checkoutId =
                    sessionStorage.getItem(key) || crypto.randomUUID();
                sessionStorage.setItem(key, checkoutId);
                const response = await api.post(
                    '/pay/',
                    { productId, paymentToken, checkoutId },
                    {
                        headers: {
                            Authorization: getCookie('jasenrekisteri-token'),
                        },
                    }
                );
                if (!active) return;
                const { url, stamp, sessionId } = response.data;
                if (!response.data.success || !url || !stamp || !sessionId)
                    throw new Error('Invalid checkout response');
                // A separate stamp for each session keeps parallel checkouts and return-page reloads usable.
                sessionStorage.setItem(`payment:${sessionId}`, stamp);
                sessionStorage.setItem('lastCheckoutKey', key);
                window.location.assign(url);
            } catch (failure) {
                if (!active) return;
                if (failure.response?.status === 409)
                    sessionStorage.removeItem(key);
                setError(
                    failure.response?.data?.error?.message ||
                        'Maksun aloitus epäonnistui. Yritä uudelleen.'
                );
            }
        }
        setError('');
        checkout();
        return () => {
            active = false;
        };
    }, [productId, paymentToken, memberId, attempt]);

    return (
        <div className="container">
            {error ? (
                <>
                    <Alert variant="danger">{error}</Alert>
                    <Button onClick={() => setAttempt(attempt + 1)}>
                        Yritä uudelleen
                    </Button>
                </>
            ) : (
                <>
                    <PreloaderComponent size="small" />
                    <p>Siirrytään Stripen maksusivulle.</p>
                </>
            )}
            <p>
                Yhdistyksen hallitus päättää jäsenyyden hyväksymisestä. Jos
                jäsenyys hylätään, jäsenmaksu palautetaan.
            </p>
        </div>
    );
}
