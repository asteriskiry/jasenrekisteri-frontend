import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import MainComponent from '../../commons/main/mainComponent';

const ForgotView = ({
    success,
    message,
    handleInputChange,
    handleForgot,
}) => (
    <MainComponent>
        <h3 className="text-center">Salasanan nollaus</h3>
        <p className="text-center">Sähköpostiosoitteeseesi lähetetään salasanan nollauslinkki.</p>
        <p className="text-center">Jos olet unohtanut sähköpostiosoitteesi, ota yhteyttä Asteriskin hallitukseen.</p>
        {message ? (
            <Alert variant={!success ? 'danger' : 'success'}>{message}</Alert>
        ) : null}
        <Form onSubmit={handleForgot}>
            <Form.Group>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Sähköpostiosoite"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Button type="submit" variant="success">
                Lähetä
            </Button>
        </Form>
        <hr />
        <div className="btm-links">
            <p>
                <Link to="/">Takaisin</Link>
            </p>
        </div>
    </MainComponent>
);

export default ForgotView;
