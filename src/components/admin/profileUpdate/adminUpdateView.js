import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

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
    handleUpdateAdmin,
    handleInputChange,
    success,
    message,
}) => (
    <div className="container">
        <Form onSubmit={handleUpdateAdmin}>
            {message ? (
                <Alert variant={!success ? 'danger' : 'success'}>
                    {message}
                </Alert>
            ) : null}
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
            <div>
                <button className="btn btn-success">Päivitä</button>
            </div>
        </Form>
    </div>
);

export default AdminUpdateView;
