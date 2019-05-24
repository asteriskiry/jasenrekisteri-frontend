import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const MemberDetailsUpdateView = ({
    firstName,
    lastName,
    utuAccount,
    email,
    hometown,
    tyyMember,
    tiviaMember,
    handleUpdateMember,
    handleInputChange,
    success,
    message,
}) => (
    <div className="container">
        <Form onSubmit={handleUpdateMember}>
            <Form.Group>
                <Form.Label>Etunimi</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={firstName}
                    onChange={handleInputChange}
                    name="firstName"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sukunimi</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={lastName}
                    onChange={handleInputChange}
                    name="lastName"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>UTU-tunnus (ilman @utu.fi)</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={utuAccount}
                    onChange={handleInputChange}
                    name="utuAccount"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sähköposti</Form.Label>
                <Form.Control
                    type="email"
                    defaultValue={email}
                    onChange={handleInputChange}
                    name="email"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Kotikunta</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={hometown}
                    onChange={handleInputChange}
                    name="hometown"
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    checked={tyyMember}
                    onChange={handleInputChange}
                    name="tyyMember"
                    label="TYYn jäsen"
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    checked={tiviaMember}
                    onChange={handleInputChange}
                    name="tiviaMember"
                    label="TIVIAn jäsen"
                />
            </Form.Group>
            <hr />
            <h6>Täytä vain jos haluat vaihtaa salasanan</h6>
            <Form.Group>
                <Form.Label>Salasana</Form.Label>
                <input
                    type="password"
                    onChange={handleInputChange}
                    className="form-control"
                    name="password"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Salasana uudelleen</Form.Label>
                <input
                    type="password"
                    onChange={handleInputChange}
                    className="form-control"
                    name="passwordAgain"
                />
            </Form.Group>
            {(message && !success) ? (
                <Alert variant={!success ? 'danger' : 'success'}>
                    {message}
                </Alert>
            ) : null}
            <div>
                <button className="btn btn-success">Päivitä</button>
                <Link className="btn btn-secondary secondary" to="/member">
                    Takaisin
                </Link>
            </div>
        </Form>
    </div>
);

export default MemberDetailsUpdateView;
