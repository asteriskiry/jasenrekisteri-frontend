import React from 'react';
import { getCookie } from '../../../../utils/cookies';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

const AdminUpdateView = ({ profile, handleUpdateAdmin, roleSwitchCase, success, message }) => (
    <div className='container'>
        <Form onSubmit={handleUpdateAdmin}>
            {(message) ? <Alert variant={(!success) ? 'danger' : 'success'}>{message}</Alert> : null }
            <Form.Group>
                <Form.Label>Etunimi</Form.Label>
                <Form.Control type="text" defaultValue={profile.firstName} name="firstName"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sukunimi</Form.Label>
                <Form.Control type="text" defaultValue={profile.lastName} name="lastName"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>UTU-tunnus (ilman @utu.fi)</Form.Label>
                <Form.Control type="text" defaultValue={profile.utuAccount} name="utuAccount"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sähköposti</Form.Label>
                <Form.Control type="email" defaultValue={profile.email} name="email"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Kotikunta</Form.Label>
                <Form.Control type="text" defaultValue={profile.hometown} name="hometown"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox" checked={profile.tyyMember} name="tyyMember" label="TYYn jäsen"></Form.Check>
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox" checked={profile.tiviaMember} name="tiviaMember" label="TIVIAn jäsen"></Form.Check>
            </Form.Group>
            <Form.Group>
                <Form.Label>Rooli</Form.Label>
                <Form.Control as="select" name="role" defaultValue={profile.role}>
                    <option value="Admin">Admin</option>
                    <option value="Board">Hallitus</option>
                    <option value="Functionary">Toimihenkilö</option>
                    <option value="Member">Jäsen</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox" checked={profile.accessRights} name="accessRights" label="24/7 kulkuoikeudet"></Form.Check>
            </Form.Group>
            <hr></hr>
            <h6>Täytä vain jos haluat vaihtaa salasanan</h6>
            <Form.Group>
                <Form.Label>Salasana</Form.Label>
                <input type="password" className="form-control" name="password"></input>
            </Form.Group>
            <Form.Group>
                <Form.Label>Salasana uudelleen</Form.Label>
                <input type="password" className="form-control" name="passwordAgain"></input>
            </Form.Group>
            <div>
                <button className='btn btn-success'>Päivitä</button>
            </div>
        </Form>
    </div>
);

export default AdminUpdateView;
