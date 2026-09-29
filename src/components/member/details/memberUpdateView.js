import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import '../../assets/validatedCheckbox.css';

const MemberUpdateView = ({
    firstName,
    lastName,
    utuAccount,
    accepted,
    currentPassword,
    password,
    passwordAgain,
    email,
    hometown,
    tyyMember,
    tiviaMember,
    handleUpdateMember,
    handleInputChange,
    success,
    message,
    matchPassword,
}) => (
    <div className="container">
        <ValidationForm
            onSubmit={(e) => {
                e.preventDefault();
                handleUpdateMember(e);
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
                    pattern="[a-zA-Z\u00c0-\u017e- ]{2,40}$"
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
                    readOnly={accepted}
                    errorMessage={{
                        required: 'UTU-tunnus on pakollinen.',
                        pattern: 'Tarkista UTU-tunnus.',
                    }}
                    pattern="[a-öA-Ö0-9.]{2,30}$"
                    onChange={handleInputChange}
                />
                {accepted && (
                    <Form.Text>
                        Hyväksytyn UTU-tunnuksen muutoksesta ota yhteyttä
                        hallitukseen.
                    </Form.Text>
                )}
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
                <Form.Text>
                    Osoitteen vaihto vaatii nykyisen salasanan ja vahvistuksen
                    uuteen osoitteeseen. Nykyinen osoite säilyy vahvistukseen
                    asti.
                </Form.Text>
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
            <hr />
            <Form.Group>
                <Form.Label>Nykyinen salasana</Form.Label>
                <TextInput
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    autoComplete="current-password"
                    onChange={handleInputChange}
                />
                <Form.Text>
                    Tarvitaan vain sähköpostiosoitteen tai salasanan
                    vaihtamiseen.
                </Form.Text>
            </Form.Group>
            <h6>Täytä vain jos haluat vaihtaa salasanan</h6>
            <Form.Group>
                <Form.Label>Salasana</Form.Label>
                <TextInput
                    type="password"
                    onChange={handleInputChange}
                    name="password"
                    value={password}
                    autoComplete="new-password"
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
                    value={passwordAgain}
                    autoComplete="new-password"
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
                <Link className="btn btn-secondary secondary" to="/member">
                    Takaisin
                </Link>
            </div>
        </ValidationForm>
    </div>
);

export default MemberUpdateView;
