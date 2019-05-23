import React from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import MainComponent from '../../commons/main/mainComponent';

const RegisterView = ({
    success,
    message,
    handleRegistration,
    handleInputChange,
}) => (
    <MainComponent>
        <h3 className="text-center">Liity jäseneksi</h3>
        {message ? (
            <Alert variant={!success ? 'danger' : 'success'}>{message}</Alert>
        ) : null}
        <Form onSubmit={handleRegistration}>
            <Form.Group>
                <Form.Label>Etunimi</Form.Label>
                <Form.Control
                    type="text"
                    name="firstName"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sukunimi</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>UTU-tunnus (ilman @utu.fi)</Form.Label>
                <Form.Control
                    type="text"
                    name="utuAccount"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sähköposti</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Kotikunta</Form.Label>
                <Form.Control
                    type="text"
                    name="hometown"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    name="tyyMember"
                    label="TYYn jäsen"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    name="tiviaMember"
                    label="TIVIAn jäsen"
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
            <Form.Group>
                <Form.Label>Salasana uudelleen</Form.Label>
                <Form.Control
                    type="password"
                    name="passwordAgain"
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Button type="submit" variant="success">
                <FontAwesomeIcon icon="sign-in-alt" /> Liity jäseneksi
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

export default RegisterView;
