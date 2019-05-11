import React from 'react';
import { getCookie } from '../../../utils/cookies';
import Alert from 'react-bootstrap/Alert';

const MemberDetailsUpdateView = (props) => (
    <div className='container'>
        <form onSubmit={props.handleUpdateMember}>
            {(props.message) ? <Alert variant={(!props.success) ? 'danger' : 'success'}>{props.message}</Alert> : null }
            <div className="form-group">
                <label>Etunimi</label>
                <input type="text" defaultValue={props.user.firstName} className="form-control" name="firstName"></input>
            </div>
            <div className="form-group">
                <label>Sukunimi</label>
                <input type="text" defaultValue={props.user.lastName} className="form-control" name="lastName"></input>
            </div>
            <div className="form-group">
                <label>UTU-tunnus (ilman @utu.fi)</label>
                <input type="text" defaultValue={props.user.utuAccount} className="form-control" name="utuAccount"></input>
            </div>
            <div className="form-group">
                <label>Sähköposti</label>
                <input type="text" defaultValue={props.user.email} className="form-control" name="email"></input>
            </div>
            <div className="form-group">
                <label>Kotikunta</label>
                <input type="text" defaultValue={props.user.hometown} className="form-control" name="hometown"></input>
            </div>
            <div className="form-check">
                <input type="checkbox" checked={props.user.tyyMember} className="form-check-input" name="tyyMember"></input>
                <label className="form-check-label">TYYn jäsen</label>
            </div>
            <div className="form-check">
                <input type="checkbox" checked={props.user.tiviaMember} className="form-check-input" name="tiviaMember"></input>
                <label className="form-check-label">TIVIAn jäsen</label>
            </div>
            <div className="form-group">
                <label>Salasana</label>
                <input type="password" className="form-control" name="password"></input>
            </div>
            <div className="form-group">
                <label>Salasana uudelleen</label>
                <input type="password" className="form-control" name="passwordAgain"></input>
            </div>
            <div className="form-group">
                <label>Rooli</label>
                {(getCookie('role') === 'admin'|'board')
                    ?
                    <select name="role" className="form-control" defaultValue={props.user.role}>
                        <option value="Admin">Admin</option>
                        <option value="Board">Hallitus</option>
                        <option value="Functionary">Toimihenkilö</option>
                        <option value="Member">Jäsen</option>
                    </select>
                    :
                    <input type="text" name="role" readOnly value={props.user.role} className="fields" />
                }
            </div>
            <div>
                <button className='btn btn-success'>Päivitä</button>
            </div>
        </form>
    </div>
);

export default MemberDetailsUpdateView;
