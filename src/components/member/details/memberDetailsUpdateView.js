import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

const MemberDetailsUpdateView = props => (
    <div className="container">
        <Form onSubmit={props.handleUpdateMember}>
            {props.message ? (
                <Alert variant={!props.success ? 'danger' : 'success'}>
                    {props.message}
                </Alert>
            ) : null}
            <Form.Group>
                <Form.Label>Etunimi</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={props.user.firstName}
                    name="firstName"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sukunimi</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={props.user.lastName}
                    name="lastName"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>UTU-tunnus (ilman @utu.fi)</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={props.user.utuAccount}
                    name="utuAccount"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sähköposti</Form.Label>
                <Form.Control
                    type="email"
                    defaultValue={props.user.email}
                    name="email"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Kotikunta</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={props.user.hometown}
                    name="hometown"
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    checked={props.user.tyyMember}
                    name="tyyMember"
                    label="TYYn jäsen"
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    checked={props.user.tiviaMember}
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
                    className="form-control"
                    name="password"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Salasana uudelleen</Form.Label>
                <input
                    type="password"
                    className="form-control"
                    name="passwordAgain"
                />
            </Form.Group>
            <div>
                <button className="btn btn-success">Päivitä</button>
            </div>
        </Form>
    </div>
);

export default MemberDetailsUpdateView;
