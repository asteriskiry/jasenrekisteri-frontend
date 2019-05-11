import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { checkCookie } from '../../../utils/cookies';
import Alert from 'react-bootstrap/Alert';

import MainComponent from '../../commons/main/mainComponent';

const LoginView = (props) => (
    <MainComponent>
        <h3 className="text-center">Jäsenrekisteri</h3>
        {(checkCookie() !== null) ? <Redirect to='/admin' /> : null}
        {(props.message) ? <Alert variant={(!props.success) ? 'danger' : 'success'}>{props.message}</Alert> : null }
        <form onSubmit={props.handleLogin} className='login-form'>
            <div className="form-group">
                <label>Sähköposti</label>
                <input type="text" className="form-control" name="email"></input>
            </div>
            <div className="form-group">
                <label>Salasana</label>
                <input type="password" className="form-control" name="password"></input>
            </div>

            <button type="submit" className="btn btn-success"><span className="fa fa-sign-in-alt"></span> Kirjaudu sisään</button>
        </form>
        <hr></hr>
        <div className="btm-links">
            <p><Link to='register'>Liity jäseneksi</Link></p>
            <p><Link to='forgot'>Salasana unohtunut?</Link></p>
            <p><Link to='https://www.asteriski.fi/virallista/jasenrekisteriseloste/'>Jäsenrekisteriseloste</Link></p>
        </div>
    </MainComponent>
);

export default LoginView;
