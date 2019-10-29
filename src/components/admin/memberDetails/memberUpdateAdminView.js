import React from 'react';

import { Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';

import '../../assets/validatedCheckbox.css';

registerLocale('fi', fi);

const MemberUpdateAdminView = ({
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
    matchPassword,
}) => (
    <div className="container">
        <ValidationForm
            onSubmit={e => {
                e.preventDefault();
                handleUpdateAdmin(e);
            }}
        >
            <Form.Group>
                <Form.Label>Etunimi</Form.Label>
                <TextInput
                    name="firstName"
                    id="firstName"
                    defaultValue={firstName}
                    errorMessage={{
                        required: 'Etunimi on pakollinen.',
                        pattern: 'Tarkista etunimi.',
                    }}
                    required
                    pattern="[a-zA-Z\u00c0-\u017e- ]{2,20}$"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sukunimi</Form.Label>
                <TextInput
                    name="lastName"
                    id="lastName"
                    defaultValue={lastName}
                    errorMessage={{
                        required: 'Sukunimi on pakollinen.',
                        pattern: 'Tarkista sukunimi.',
                    }}
                    required
                    pattern="[a-zA-Z\u00c0-\u017e- ]{2,25}$"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>UTU-tunnus (ilman @utu.fi)</Form.Label>
                <TextInput
                    name="utuAccount"
                    id="utuAccount"
                    defaultValue={utuAccount}
                    errorMessage={{
                        required: 'UTU-tunnus on pakollinen.',
                        pattern: 'Tarkista UTU-tunnus.',
                    }}
                    pattern="[a-öA-Ö.]{2,30}$"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sähköposti</Form.Label>
                <TextInput
                    name="email"
                    defaultValue={email}
                    id="email"
                    errorMessage={{
                        required: 'Sähköpostiosoite on pakollinen.',
                        validator: 'Tarkista sähköpostiosoite.',
                    }}
                    validator={validator.isEmail}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Kotikunta</Form.Label>
                <TextInput
                    name="hometown"
                    id="hometown"
                    defaultValue={hometown}
                    errorMessage={{
                        required: 'Kotikunta on pakollinen.',
                        pattern: 'Tarkista kotikunta.',
                    }}
                    required
                    pattern="[a-zA-Z\u00c0-\u017e- ]{2,25}$"
                    onChange={handleInputChange}
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
                        selected={
                            membershipStarts ? new Date(membershipStarts) : null
                        }
                        onChange={handleMembershipStartsChange}
                        dateFormat="dd.MM.yyyy"
                        className="form-control"
                        locale="fi"
                    />
                </div>
                <div className="col">
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
                </div>
            </div>
            <hr />
            <h6>Täytä vain jos haluat vaihtaa salasanan</h6>
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
            {message && !success ? (
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
        </ValidationForm>
    </div>
);

export default MemberUpdateAdminView;
