import React from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ValidationForm,
    TextInput,
    SelectGroup,
    Checkbox,
} from 'react-bootstrap4-form-validation';
import validator from 'validator';
import '../../assets/validatedCheckbox.css';

import { Alert, Form, Button, Row, Col } from 'react-bootstrap';

import MainComponent from '../../commons/main/mainComponent';

const currentDate = new Date();

const RegisterView = ({
    success,
    message,
    productId,
    handleRegistration,
    handleInputChange,
}) => (
    <MainComponent big="true">
        <h3 className="text-center">Liity jäseneksi</h3>
        <p>
            Voit jättää jäsenhakemuksesi Asteriski ry:lle tästä. Täytön jälkeen
            siirryt valitsemaan maksutapaa. Onnistuneen maksun jälkeen
            sähköpostiisi lähetetään salasana, jolla pääset kirjautumaan, joten
            varmistathan että sähköpostiosoite on oikein.
        </p>
        <p>
            Asteriski ry:n hallitus hyväksyy jäsenyytesi mahdollisimman pian.
            Mikäli jäsenyyttäsi ei hyväksytä, jäsenmaksu palautetaan.
        </p>
        <p><strong>
                Piltti! Huomaathan seuraavan ennen jäsenyyden ostoa.
        </strong></p>
        <p>
            Huomioithan, että jäsenyys on voimassa lu­ku­vuo­sit­tain (1.8.–31.7.)
            ja ennen 31.7. ostettu jäsenyys erääntyy kuluvana vuotena. Mikäli
            ostat viisi vuotta jäsenyyttä, kuluu ensimmäinen vuotesi 31.7.
            kuluvaa vuotta, jos jäsenyys on ostettu ennen 31.7. ja seuraavaa
            vuotta, jos jäsenyys on ostettu 1.8. jälkeen.
        </p>
        <p>
            <a href="https://www.asteriski.fi/jasenyys/">Lisätietoa jäsenyydestä</a>.
        </p>
        <ValidationForm
            onSubmit={e => {
                e.preventDefault();
                handleRegistration(e);
            }}
        >
            <Row>
                <Col md>
                    <Form.Group>
                        <Form.Label>Etunimi</Form.Label>
                        <TextInput
                            name="firstName"
                            id="firstName"
                            errorMessage={{
                                required: 'Etunimi on pakollinen.',
                                pattern: 'Tarkista etunimi.',
                            }}
                            required
                            pattern="[a-zA-Z\u00c0-\u017e- ]{2,20}$"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group>
                        <Form.Label>Sukunimi</Form.Label>
                        <TextInput
                            name="lastName"
                            id="lastName"
                            errorMessage={{
                                required: 'Sukunimi on pakollinen.',
                                pattern: 'Tarkista sukunimi.',
                            }}
                            required
                            pattern="[a-zA-Z\u00c0-\u017e- ]{2,25}$"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md>
                    <Form.Group>
						<Form.Label>UTU-tunnus (ilman @utu.fi)</Form.Label>
						<TextInput
							name="utuAccount"
							id="utuAccount"
							errorMessage={{
								required: 'UTU-tunnus on pakollinen.',
								pattern: 'Tarkista UTU-tunnus.',
							}}
							pattern="[a-öA-Ö0-9.]{2,30}$"
							onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group>
                        <Form.Label>Sähköposti</Form.Label>
                        <TextInput
                            name="email"
                            id="email"
                            errorMessage={{
                                required: 'Sähköpostiosoite on pakollinen.',
                                validator: 'Tarkista sähköpostiosoite.',
                            }}
                            validator={validator.isEmail}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md>
                    <Form.Group>
                        <Form.Label>Kotikunta</Form.Label>
                        <TextInput
                            name="hometown"
                            id="hometown"
                            errorMessage={{
                                required: 'Kotikunta on pakollinen.',
                                pattern: 'Tarkista kotikunta.',
                            }}
                            required
                            pattern="[a-zA-Z\u00c0-\u017e- ]{2,25}$"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group>
                        <Form.Label>Jäsenmaksu</Form.Label>
                        <SelectGroup
                            name="productId"
                            id="productId"
                            required
                            errorMessage="Valitse jäsenyys."
                            value={productId}
                            onChange={handleInputChange}
                        >
                            <option value="1111">1 vuosi - 5€</option>
                            <option value="1555">5 vuotta - 20€</option>
                        </SelectGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group>
                <Form.Check
                    inline
                    type="checkbox"
                    name="tyyMember"
                    label="TYYn jäsen"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Checkbox
                name="acceptTerms"
                label="Hyväksyn että tietojani käsitellään jäsenrekisteriselosteen mukaisesti"
                id="acceptTerms"
                required
                errorMessage="Tämä on hyväksyttävä."
                onChange={handleInputChange}
            />

            {message ? (
                <Alert variant={!success ? 'danger' : 'success'}>
                    {message}
                </Alert>
            ) : null}
            <Button type="submit" variant="success">
                <FontAwesomeIcon icon="sign-in-alt" /> Siirry maksamaan
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

export default RegisterView;
