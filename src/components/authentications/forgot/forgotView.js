import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';

import MainComponent from '../../commons/main/mainComponent';

const ForgotView = ({
    success,
    message,
    handleInputChange,
    handleForgot,
}) => (
    <MainComponent>
        <h3 className="text-center">Salasanan palautus</h3>
        <p className="text-center">Sähköpostiosoitteeseesi lähetetään salasanan palautuslinkki. Linkki on voimassa tunnin.</p>
        <p className="text-center">Jos olet unohtanut sähköpostiosoitteesi, ota yhteyttä Asteriskin hallitukseen.</p>
        {message ? (
            <Alert variant={!success ? 'danger' : 'success'}>{message}</Alert>
        ) : null}
        <ValidationForm
            onSubmit={e => {
                e.preventDefault();
                handleForgot(e);
            }}
        >
            <Form.Group>
                <TextInput
                    name="email"
                    id="email"
                    errorMessage={{
                        required: 'Sähköpostiosoite on pakollinen.',
                        validator: 'Tarkista sähköpostiosoite.',
                    }}
                    validator={validator.isEmail}
                    onChange={handleInputChange}
                    placeholder="Sähköpostiosoite"
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

export default ForgotView;
