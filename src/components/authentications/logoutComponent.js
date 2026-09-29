import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { sessionStore } from '../../utils/auth';
import PreloaderComponent from '../commons/preloader/preloaderComponent';

export default function LogoutComponent() {
    const [complete, setComplete] = useState(false);
    const [error, setError] = useState(false);
    const [attempt, setAttempt] = useState(0);
    useEffect(() => {
        let active = true;
        setError(false);
        sessionStore
            .logout()
            .then(() => {
                if (active) setComplete(true);
            })
            .catch(() => {
                if (active) setError(true);
            });
        return () => {
            active = false;
        };
    }, [attempt]);
    if (complete) return <Redirect to="/" />;
    if (error)
        return (
            <div role="alert">
                Uloskirjautuminen epäonnistui.{' '}
                <button onClick={() => setAttempt(attempt + 1)}>
                    Yritä uudelleen
                </button>
            </div>
        );
    return <PreloaderComponent />;
}
