import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';

registerLocale('fi', fi);

const AdminUpdateView = ({
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
    accepted,
    handleUpdateAdmin,
    handleInputChange,
    handleMembershipStartsChange,
    handleMembershipEndsChange,
    success,
    message,
    memberID,
}) => (
    <div className="container">
        <Form onSubmit={handleUpdateAdmin}>
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
                    checked={accessRights}
                    onChange={handleInputChange}
                    name="accessRights"
                    label="24/7 kulkuoikeudet"
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    checked={accepted}
                    onChange={handleInputChange}
                    name="accepted"
                    label="Hyväksytty jäseneksi"
                />
            </Form.Group>
            <div className="row">
                <div className="col">
                    <Form.Label className="d-block">Jäsenyys alkaa</Form.Label>
                    <DatePicker
                        selected={(membershipStarts) ? new Date(membershipStarts) : null}
                        onChange={handleMembershipStartsChange}
                        dateFormat="dd.MM.yyyy"
                        className="form-control"
                        locale='fi'
                    />
                </div>
                <div className="col">
                    <Form.Label className="d-block">Jäsenyys päättyy</Form.Label>
                    <DatePicker
                        selected={(membershipEnds) ? new Date(membershipEnds) : null}
                        onChange={handleMembershipEndsChange}
                        dateFormat="dd.MM.yyyy"
                        className="form-control"
                        locale='fi'
                    />
                </div>
            </div>
            <hr />
            <h6>Täytä vain jos haluat vaihtaa salasanan</h6>
            <Form.Group>
                <Form.Label>Salasana</Form.Label>
                <input
                    type="password"
                    className="form-control"
                    onChange={handleInputChange}
                    name="password"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Salasana uudelleen</Form.Label>
                <input
                    type="password"
                    className="form-control"
                    onChange={handleInputChange}
                    name="passwordAgain"
                />
            </Form.Group>
            {message ? (
                <Alert variant={!success ? 'danger' : 'success'}>
                    {message}
                </Alert>
            ) : null}
            <div>
                <button className="btn btn-success">Päivitä</button>
                <Link
                    className="btn btn-secondary secondary"
                    to={`/member/details/${memberID}`}
                >
                    Takaisin
                </Link>
            </div>
        </Form>
    </div>
);

export default AdminUpdateView;
