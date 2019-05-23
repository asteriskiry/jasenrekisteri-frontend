import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import MainComponent from '../../commons/main/mainComponent';

import api from '../../../utils/api';

class ForgotComponent extends Component {
    state = {
        success: false,
        message: '',
    };

    renew = event => {
        event.preventDefault();
        const data = {
            password: event.target.password.value,
            username: event.target.username.value,
        };
    };

    render() {
        return (
            <MainComponent>
                {this.state.message ? (
                    <Alert variant={!this.state.success ? 'danger' : 'success'}>
                        {this.state.message}
                    </Alert>
                ) : null}
                <form onSubmit={this.renew.bind(this)}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Sähköpostiosoite"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Uusi salasana"
                    />
                    <Button variant="success">Vaihda salasana</Button>
                </form>
                <hr />
                <div className="btm-links">
                    <p>
                        <Link to="/">Takaisin</Link>
                    </p>
                </div>
            </MainComponent>
        );
    }
}

export default ForgotComponent;
