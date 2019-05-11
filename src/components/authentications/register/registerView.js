import React from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

import MainComponent from '../../commons/main/mainComponent';

const RegisterView = (props) => (
    <MainComponent>
        <h3 className="text-center">Liity jäseneksi</h3>
        {(props.message) ? <Alert variant={(!props.success) ? 'danger' : 'success'}>{props.message}</Alert> : null }
        <form onSubmit={props.handleRegistration}>
            <div className="form-group">
                <label>Etunimi</label>
                <input type="text" className="form-control" name="firstName"></input>
            </div>
            <div className="form-group">
                <label>Sukunimi</label>
                <input type="text" className="form-control" name="lastName"></input>
            </div>
            <div className="form-group">
                <label>UTU-tunnus (ilman @utu.fi)</label>
                <input type="text" className="form-control" name="utuAccount"></input>
            </div>
            <div className="form-group">
                <label>Sähköposti</label>
                <input type="text" className="form-control" name="email"></input>
            </div>
            <div className="form-group">
                <label>Kotikunta</label>
                <input type="text" className="form-control" name="hometown"></input>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" name="tyyMember"></input>
                <label className="form-check-label">TYYn jäsen</label>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" name="tiviaMember"></input>
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

            <button className="btn btn-success"><span className="fa fa-sign-in-alt"></span> Liity jäseneksi</button>
        </form>
        <hr></hr>
        <div className="btm-links">
            <p><Link to='/'>Takaisin</Link></p>
        </div>
    </MainComponent>
);

export default RegisterView;
