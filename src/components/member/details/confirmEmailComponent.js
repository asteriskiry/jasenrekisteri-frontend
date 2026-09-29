import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';
import { useAuth } from '../../../container/authProvider';
import { sessionStore } from '../../../utils/auth';
import MainComponent from '../../commons/main/mainComponent';

export default function ConfirmEmailComponent({ match, location }) {
    const { user, loading } = useAuth();
    const [busy, setBusy] = useState(false);
    const [done, setDone] = useState(false);
    const [message, setMessage] = useState('');
    const confirm = async () => {
        setBusy(true);
        try {
            const response = await api.post('/member/email/confirm', {
                token: match.params.token,
            });
            setMessage(response.data.message);
            setDone(true);
            sessionStore.clear();
        } catch (error) {
            setMessage(
                error.response?.data?.error?.message ||
                    'Vahvistaminen epäonnistui. Yritä uudelleen.'
            );
        } finally {
            setBusy(false);
        }
    };
    return (
        <MainComponent big="true">
            <h3>Vahvista uusi sähköpostiosoite</h3>
            {message && <p role="status">{message}</p>}
            {done ? (
                <Link to="/">Kirjaudu uudella osoitteella</Link>
            ) : loading ? (
                <p>Tarkistetaan kirjautumista…</p>
            ) : user ? (
                <button
                    className="btn btn-success"
                    disabled={busy}
                    onClick={confirm}
                >
                    {busy ? 'Vahvistetaan…' : 'Vahvista osoitteen vaihto'}
                </button>
            ) : (
                <>
                    <p>
                        Kirjaudu nykyisellä sähköpostiosoitteellasi
                        vahvistaaksesi muutoksen.
                    </p>
                    <Link to={{ pathname: '/', state: { from: location } }}>
                        Kirjaudu sisään
                    </Link>
                </>
            )}
        </MainComponent>
    );
}
