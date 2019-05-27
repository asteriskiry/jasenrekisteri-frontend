import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';

registerLocale('fi', fi);

const addMemberView = ({
    firstName,
    lastName,
    utuAccount,
    email,
    hometown,
    tyyMember,
    tiviaMember,
    role,
    accessRights,
    membershipStarts,
    membershipEnds,
    handleAddMember,
    handleInputChange,
    handleMembershipStartsChange,
    handleMembershipEndsChange,
    success,
    message,
    memberID,
}) => (
    <div className="container">
        <Form onSubmit={handleAddMember}>
            <Form.Group>
                <Form.Label>Etunimi</Form.Label>
                <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    name="firstName"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sukunimi</Form.Label>
                <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    name="lastName"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>UTU-tunnus (ilman @utu.fi)</Form.Label>
                <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    name="utuAccount"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sähköposti</Form.Label>
                <Form.Control
                    type="email"
                    onChange={handleInputChange}
                    name="email"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Kotikunta</Form.Label>
                <Form.Control
                    type="text"
                    onChange={handleInputChange}
                    name="hometown"
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    onChange={handleInputChange}
                    name="tyyMember"
                    label="TYYn jäsen"
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    onChange={handleInputChange}
                    name="tiviaMember"
                    label="TIVIAn jäsen"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Rooli</Form.Label>
                <Form.Control
                    as="select"
                    name="role"
                    value={role}
                    onChange={handleInputChange}
                >
                    <option value="Admin">Admin</option>
                    <option value="Board">Hallitus</option>
                    <option value="Functionary">Toimihenkilö</option>
                    <option value="Member">Jäsen</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    onChange={handleInputChange}
                    name="accessRights"
                    label="24/7 kulkuoikeudet"
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    onChange={handleInputChange}
                    name="accepted"
                    label="Jäsenyys hyväksytty"
                />
            </Form.Group>
            <div className="row">
                <div className="col">
                    <Form.Group>
                        <Form.Label className="d-block">
                            Jäsenyys alkaa
                        </Form.Label>
                        <DatePicker
                            selected={
                                membershipStarts
                                    ? new Date(membershipStarts)
                                    : null
                            }
                            onChange={handleMembershipStartsChange}
                            dateFormat="dd.MM.yyyy"
                            className="form-control"
                            locale="fi"
                        />
                    </Form.Group>
                </div>
                <div className="col">
                    <Form.Group>
                        <Form.Label className="d-block">
                            Jäsenyys päättyy
                        </Form.Label>
                        <DatePicker
                            selected={
                                membershipEnds ? new Date(membershipEnds) : null
                            }
                            onChange={handleMembershipEndsChange}
                            dateFormat="dd.MM.yyyy"
                            className="form-control"
                            locale="fi"
                        />
                    </Form.Group>
                </div>
            </div>
            <p>Jäsenelle generoidaan salasana joka lähetetään hänelle sähköpostitse</p>
            {(message && !success) ? (
                <Alert variant={!success ? 'danger' : 'success'}>
                    {message}
                </Alert>
            ) : null}
            <div>
                <button className="btn btn-success">Lisää uusi jäsen</button>
                <Link className="btn btn-secondary secondary" to="/admin">
                    Takaisin
                </Link>
            </div>
        </Form>
    </div>
);

export default addMemberView;
