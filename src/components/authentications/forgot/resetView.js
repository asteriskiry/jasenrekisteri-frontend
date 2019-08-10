import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';

import MainComponent from '../../commons/main/mainComponent';

const ResetView = ({
    success,
    message,
    handleInputChange,
    handleReset,
    matchPassword,
}) => (
    <MainComponent>
        <h3 className="text-center">Uusi salasana</h3>
        {message ? (
            <Alert variant={!success ? 'danger' : 'success'}>{message}</Alert>
        ) : null}
        <ValidationForm
            onSubmit={e => {
                e.preventDefault();
                handleReset(e);
            }}
        >
            <Form.Group>
                <Form.Label>Salasana</Form.Label>
                <TextInput
                    type="password"
                    onChange={handleInputChange}
                    name="password"
                    pattern="^$|[^\n]{6,}"
                    errorMessage={{
                        pattern: 'Salasanan minimipituus on 6 merkkiä.',
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Salasana uudelleen</Form.Label>
                <TextInput
                    type="password"
                    onChange={handleInputChange}
                    name="passwordAgain"
                    validator={matchPassword}
                    errorMessage={{ validator: 'Salasanat eivät täsmää.' }}
                />
            </Form.Group>
            <Button type="submit" variant="success">
                Lähetä
            </Button>
        </ValidationForm>
        <hr />
        <div className="btm-links">
            <p>
                <Link to="/">Takaisin</Link>
            </p>
        </div>
    </MainComponent>
);

export default ResetView;
