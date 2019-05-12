import React from 'react';
import { getCookie } from '../../../utils/cookies';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

const MemberDetailsUpdateView = (props) => (
    <div className='container'>
        <Form onSubmit={props.handleUpdateMember}>
            {(props.message) ? <Alert variant={(!props.success) ? 'danger' : 'success'}>{props.message}</Alert> : null }
            <Form.Group>
                <Form.Label>Etunimi</Form.Label>
                <Form.Control type="text" defaultValue={props.user.firstName} name="firstName"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sukunimi</Form.Label>
                <Form.Control type="text" defaultValue={props.user.lastName} name="lastName"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>UTU-tunnus (ilman @utu.fi)</Form.Label>
                <Form.Control type="text" defaultValue={props.user.utuAccount} name="utuAccount"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sähköposti</Form.Label>
                <Form.Control type="email" defaultValue={props.user.email} name="email"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Kotikunta</Form.Label>
                <Form.Control type="text" defaultValue={props.user.hometown} name="hometown"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox" checked={props.user.tyyMember} name="tyyMember" label="TYYn jäsen"></Form.Check>
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox" checked={props.user.tiviaMember} name="tiviaMember" label="TIVIAn jäsen"></Form.Check>
            </Form.Group>
            <Form.Group>
                <Form.Label>Rooli</Form.Label>
                {(getCookie('role').toLowerCase() === 'admin'|'board')
                    ?
                    <Form.Control as="select" name="role" defaultValue={props.user.role}>
                        <option value="Admin">Admin</option>
                        <option value="Board">Hallitus</option>
                        <option value="Functionary">Toimihenkilö</option>
                        <option value="Member">Jäsen</option>
                    </Form.Control>
                    :
                    <Form.Control type="text" name="role" readOnly value={props.roleSwitchCase(props.user)} />
                }
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

export default MemberDetailsUpdateView;
