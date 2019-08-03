import React from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            Voit jättää jäsenhakemuksesi tästä. Täytön jälkeen siirryt
            valitsemaan maksutapaa. Onnistuneen maksun jälkeen pääset
            kirjautumaan sisään sähköpostiisi lähetetyllä salasanalla. Tämän
            jälkeen hallitus hyväksyy jäsenyytesi mahdollisimman pian. Mikäli
            jäsenyyttäsi ei hyväksytä, jäsenmaksu palautetaan.
        </p>
        <Form onSubmit={handleRegistration}>
            <Row>
                <Col md>
                    <Form.Group>
                        <Form.Label>Etunimi</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group>
                        <Form.Label>Sukunimi</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md>
                    <Form.Group>
                        <Form.Label>UTU-tunnus (ilman @utu.fi)</Form.Label>
                        <Form.Control
                            type="text"
                            name="utuAccount"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group>
                        <Form.Label>Sähköposti</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md>
            <Form.Group>
                <Form.Label>Kotikunta</Form.Label>
                <Form.Control
                    type="text"
                    name="hometown"
                    onChange={handleInputChange}
                />
            </Form.Group>
                </Col>
                <Col md>
            <Form.Group>
                <Form.Label>Jäsenmaksu</Form.Label>
                <Form.Control
                    as="select"
                    name="productId"
                    value={productId}
                    onChange={handleInputChange}
                >
                    <option value="1111">1 vuosi - 5€</option>
                    <option value="1555">5 vuotta - 20€</option>
                    {currentDate.getMonth() > 6 ? (
                        <option value="1222">
                            Pilttitarjous: 1,5 vuotta - 7€
                        </option>
                    ) : null}
                </Form.Control>
            </Form.Group>
                </Col>
            </Row>
            {productId === '1222' ? (
                <p>
                    Pilttitarjous on tarkoitettu vain uusille
                    tietojenkäsittelytiedeiden opiskelijoille. Pilttitarjouksen
                    jäsenyyden pituus on kuluvan vuoden loppuun ja koko ensi
                    vuosi.
                </p>
            ) : null}
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

            {message ? (
                <Alert variant={!success ? 'danger' : 'success'}>
                    {message}
                </Alert>
            ) : null}
            <Button type="submit" variant="success">
                <FontAwesomeIcon icon="sign-in-alt" /> Siirry maksamaan
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
