import React, { Component } from 'react';

import LoginView from './loginView';

import { sessionStore } from '../../../utils/auth';
import { AuthContext } from '../../../container/authProvider';
import { Redirect } from 'react-router-dom';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';

class LoginComponent extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            message: null,
            email: null,
            password: null,
        };
    }

    handleLogin = async (event) => {
        event.preventDefault();

        let email = this.state.email;
        let password = this.state.password;

        const data = {
            email,
            password,
        };

        try {
            const response = await sessionStore.login(data);
            this.setState({
                ...this.state,
                ...{
                    isLoading: false,
                    success: response.data.success,
                    message: response.data.message,
                },
            });
            if (response.data.success) {
                this.props.history.push(this.loginDestination());
            }
        } catch (e) {
            this.setState({
                ...this.state,
                ...{
                    success: false,
                    message:
                        e.response?.data?.error?.message ||
                        'Pyyntö kirjautumiselle epäonnistui.',
                    isLoading: false,
                },
            });
        }
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    loginDestination = () => {
        const path = this.props.location?.state?.from?.pathname;
        return typeof path === 'string' &&
            /^\/member\/email\/confirm\/[a-f0-9]{64}$/.test(path)
            ? path
            : '/member/profile';
    };

    render() {
        if (this.context.loading) return <PreloaderComponent />;
        if (this.context.user) return <Redirect to={this.loginDestination()} />;
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
