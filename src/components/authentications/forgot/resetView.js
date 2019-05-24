import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import MainComponent from '../../commons/main/mainComponent';

const ResetView = ({ success, message, handleInputChange, handleReset }) => (
    <MainComponent>
        <h3 className="text-center">Uusi salasana</h3>
        {message ? (
            <Alert variant={!success ? 'danger' : 'success'}>{message}</Alert>
        ) : null}
        <Form onSubmit={handleReset}>
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

export default ResetView;
