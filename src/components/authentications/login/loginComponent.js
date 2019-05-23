import React, { Component } from 'react';

import LoginView from './loginView';

import { setCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            message: null,
            email: null,
            password: null,
        };
    }

    handleLogin = async event => {
        event.preventDefault();

        let email = this.state.email;
        let password = this.state.password;

        const data = {
            email,
            password,
        };

        try {
            const response = await api.post('/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.setState({
                ...this.state,
                ...{
                    isLoading: false,
                    success: response.data.success,
                    message: response.data.message,
                },
            });
            if (this.state.success) {
                setCookie('jasenrekisteri-token', response.data.token, 1);
                setCookie('role', response.data.role, 1);
                setCookie('id', response.data.id, 1);
                this.props.history.push("/member/profile");
            }
            console.log('Returned data:', response);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
            this.setState({
                ...this.state,
                ...{
                    success: false,
                    message: 'Pyyntö kirjautumiselle epäonnistui.',
                    isLoading: false,
                },
            });
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
            <LoginView
                handleLogin={this.handleLogin}
                success={this.state.success}
                message={this.state.message}
                handleInputChange={this.handleInputChange}
            />
        );
    }
}

export default LoginComponent;
