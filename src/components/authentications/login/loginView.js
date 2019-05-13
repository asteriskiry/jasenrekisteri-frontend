import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { checkCookie } from '../../../utils/cookies';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MainComponent from '../../commons/main/mainComponent';

const LoginView = props => (
    <MainComponent>
        <h3 className="text-center">Jäsenrekisteri</h3>
        {checkCookie() !== null ? <Redirect to="/admin" /> : null}
        {props.message ? (
            <Alert variant={!props.success ? 'danger' : 'success'}>
                {props.message}
            </Alert>
        ) : null}
        <form onSubmit={props.handleLogin} className="login-form">
            <div className="form-group">
                <label>Sähköposti</label>
                <input type="text" className="form-control" name="email" />
            </div>
            <div className="form-group">
                <label>Salasana</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                />
            </div>

            <button type="submit" className="btn btn-success">
                <FontAwesomeIcon icon="sign-in-alt" /> Kirjaudu sisään
            </button>
        </form>
        <hr />
        <div className="btm-links">
            <p>
                <Link to="register">Liity jäseneksi</Link>
            </p>
            <p>
                <Link to="forgot">Salasana unohtunut?</Link>
            </p>
            <p>
                <a href="https://www.asteriski.fi/virallista/jasenrekisteriseloste/">
                    Jäsenrekisteriseloste
                </a>
            </p>
        </div>
    </MainComponent>
);

export default LoginView;
