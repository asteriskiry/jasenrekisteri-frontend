import React from 'react';

import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import MainComponent from '../../commons/main/mainComponent';

import { checkCookie } from '../../../utils/cookies';

const LoginView = ({ success, message, handleLogin, handleInputChange }) => (
    <MainComponent>
        <h3 className="text-center">Jäsenrekisteri</h3>
        {checkCookie() !== null ? <Redirect to="/admin" /> : null}
        {message ? (
            <Alert variant={!success ? 'danger' : 'success'}>{message}</Alert>
        ) : null}
        <Form onSubmit={handleLogin} className="login-form">
            <Form.Group>
                <Form.Label>Sähköposti</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Salasana</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Button type="submit" variant="success">
                <FontAwesomeIcon icon="sign-in-alt" /> Kirjaudu sisään
            </Button>
        </Form>
        <hr />
        <div className="btm-links">
            <p>
                <Link to="register">Liity jäseneksi</Link>
            </p>
            <p>
                <Link to="forgot">Salasana unohtunut?</Link>
            </p>
            <p>
                <a href="https://www.asteriski.fi/virallista/jasenrekisteriseloste/">
                    Jäsenrekisteriseloste
                </a>
            </p>
        </div>
    </MainComponent>
);

export default LoginView;
