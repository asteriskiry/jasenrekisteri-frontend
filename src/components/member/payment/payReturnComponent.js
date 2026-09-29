import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainComponent from '../../commons/main/mainComponent';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import api from '../../../utils/api';
import { fetchPaymentStatus, pollPaymentStatus } from './paymentStatus';

export default function PayReturnComponent({ location }) {
    const [result, setResult] = useState(null);
    const [attempt, setAttempt] = useState(0);
    useEffect(() => {
        const controller = new AbortController();
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');
        if (params.get('canceled') === 'true') {
            setResult({
                state: 'canceled',
                message:
                    'Palasit maksusivulta. Maksua ei ole vahvistettu; voit jatkaa maksamista.',
            });
            return;
        }
        try {
            sessionStorage.removeItem(`payment:${sessionId}`);
            sessionStorage.removeItem('jasenrekisteriPaymentStamp');
        } catch {
            // Receipt access does not depend on tab storage cleanup.
        }
        setResult(null);
        pollPaymentStatus(
            () => fetchPaymentStatus(api, sessionId, controller.signal),
            { signal: controller.signal }
        )
            .then((data) => {
                if (
                    ['complete', 'review', 'failed', 'expired'].includes(
                        data.state
                    )
                ) {
                    try {
                        const checkoutKey = sessionStorage.getItem(
                            `checkout-key:${sessionId}`
                        );
                        if (checkoutKey) sessionStorage.removeItem(checkoutKey);
                    } catch {
                        // Cleanup must not hide a confirmed payment.
                    }
                }
                if (!controller.signal.aborted) setResult(data);
            })
            .catch(() => {
                if (!controller.signal.aborted)
                    setResult({
                        state: 'error',
                        message:
                            'Maksun tilan tarkistus epäonnistui. Yritä uudelleen.',
                    });
            });
        return () => controller.abort();
    }, [location.search, attempt]);

    const payment = result?.paymentData;
    const date = (value) =>
        value
            ? new Date(value).toLocaleDateString('fi-FI', {
                  timeZone: 'Europe/Helsinki',
              })
            : '—';
    return (
        <MainComponent big="true">
            {!result ? (
                <>
                    <PreloaderComponent />
                    <p>Odotetaan maksun vahvistusta.</p>
                </>
            ) : (
                <>
                    <Alert
                        variant={
                            result.state === 'complete'
                                ? 'success'
                                : result.state === 'error' ||
                                    result.state === 'failed'
                                  ? 'danger'
                                  : 'info'
                        }
                    >
                        {result.message}
                    </Alert>
                    {payment && (
                        <>
                            <h3>Maksun tiedot</h3>
                            <p>
                                {payment.firstName} {payment.lastName} —{' '}
                                {payment.product},{' '}
                                {(payment.amount / 100).toFixed(2)} €
                            </p>
                            <p>
                                Jäsenyyden päättymispäivä:{' '}
                                <strong>{date(payment.membershipEnds)}</strong>
                            </p>
                            <p>
                                Kuitti toimitetaan sähköpostiosoitteeseesi{' '}
                                {payment.email}.
                            </p>
                            {payment.newMember && (
                                <p>
                                    Tervetuloa jäseneksi!{' '}
                                    <Link to="/forgot">Aseta salasanasi</Link>{' '}
                                    sähköpostiosoitteellasi. Hallitus hyväksyy
                                    jäsenyytesi erikseen.
                                </p>
                            )}
                        </>
                    )}
                    {(result.state === 'pending' ||
                        result.state === 'error') && (
                        <Button onClick={() => setAttempt(attempt + 1)}>
                            Tarkista uudelleen
                        </Button>
                    )}
                    <p>
                        <Link to="/">Takaisin kirjautumiseen</Link>
                    </p>
                </>
            )}
        </MainComponent>
    );
}
