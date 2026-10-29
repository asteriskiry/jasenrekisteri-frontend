import React, { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import api from '../../../utils/api';

export default function DeleteExpiredMembers({ onDeleted }) {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const [confirmation, setConfirmation] = useState('');
    const [sendEmail, setSendEmail] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState('');

    const showPreview = async () => {
        setOpen(true);
        setPreview(null);
        setConfirmation('');
        setSendEmail(true);
        setError('');
        setResult('');
        setBusy(true);
        try {
            const response = await api.get('/admin/expired');
            setPreview(response.data.data);
        } catch {
            setError(
                'Poistettavien käyttäjien määrän hakeminen epäonnistui. Sulje ikkuna ja yritä uudelleen.'
            );
        } finally {
            setBusy(false);
        }
    };

    const remove = async (event) => {
        event.preventDefault();
        if (busy || !preview?.count || confirmation !== 'DELETE') return;
        setBusy(true);
        setError('');
        try {
            const response = await api.post('/admin/remove-expired', {
                previewToken: preview.previewToken,
                confirmation,
                sendEmail,
            });
            onDeleted(response.data.data.deletedIds);
            setResult(`${response.data.data.count} käyttäjää poistettu.`);
            setOpen(false);
        } catch (error) {
            setPreview(null);
            setConfirmation('');
            setError(
                error.response?.data?.error?.message ||
                    'Poiston tulosta ei voitu varmistaa. Sulje ikkuna ja päivitä jäsenlista ennen uutta yritystä.'
            );
        } finally {
            setBusy(false);
        }
    };

    return (
        <>
            <Button variant="danger" onClick={showPreview} disabled={busy}>
                Poista vanhentuneet käyttäjät
            </Button>
            {result && (
                <Alert variant="success" className="mt-2" role="status">
                    {result}
                </Alert>
            )}
            <Modal
                show={open}
                onHide={() => {
                    if (!busy) setOpen(false);
                }}
                aria-labelledby="delete-expired-title"
                backdrop="static"
                keyboard={!busy}
            >
                <Form onSubmit={remove}>
                    <Modal.Header closeButton={!busy}>
                        <Modal.Title id="delete-expired-title">
                            Poista vanhentuneet käyttäjät
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && (
                            <Alert variant="danger" role="alert">
                                {error}
                            </Alert>
                        )}
                        {busy && (
                            <p role="status">
                                {preview
                                    ? 'Poistetaan käyttäjiä…'
                                    : 'Haetaan poistettavien käyttäjien määrää…'}
                            </p>
                        )}
                        {preview && (
                            <>
                                <p>
                                    <strong>
                                        {preview.count} käyttäjää poistetaan
                                        pysyvästi.
                                    </strong>{' '}
                                    Poistoa ei voi perua.
                                </p>
                                <p>
                                    Poisto koskee kaikkia käyttäjiä, joiden
                                    jäsenyys on päättynyt, riippumatta listan
                                    hakuehdosta. Oma käyttäjätilisi ja käyttäjät
                                    ilman jäsenyyden päättymispäivää
                                    säilytetään.
                                </p>
                                {preview.count > 0 ? (
                                    <Form.Group controlId="delete-expired-confirmation">
                                        <Form.Label>
                                            Vahvista kirjoittamalla DELETE
                                        </Form.Label>
                                        <Form.Control
                                            autoFocus
                                            autoComplete="off"
                                            value={confirmation}
                                            onChange={(event) =>
                                                setConfirmation(
                                                    event.target.value
                                                )
                                            }
                                            disabled={busy}
                                        />
                                    </Form.Group>
                                ) : (
                                    <p>Poistettavia käyttäjiä ei löytynyt.</p>
                                )}
                                <Form.Check
                                    id="delete-expired-send-email"
                                    type="checkbox"
                                    label="Lähetä poistettaville käyttäjille sähköposti"
                                    checked={sendEmail}
                                    onChange={(event) => setSendEmail(event.target.checked)}
                                    disabled={busy || !preview.count}
                                />
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setOpen(false)}
                            disabled={busy}
                        >
                            Peruuta
                        </Button>
                        <Button
                            variant="danger"
                            type="submit"
                            disabled={
                                busy ||
                                !preview?.count ||
                                confirmation !== 'DELETE'
                            }
                        >
                            Poista käyttäjät
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
