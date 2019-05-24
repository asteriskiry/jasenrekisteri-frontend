import React, { Component } from 'react';

import RegisterView from './registerView';

import api from '../../../utils/api';

class RegisterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            firstName: null,
            lastName: null,
            utuAccount: null,
            email: null,
            hometown: null,
            tyyMember: null,
            tiviaMember: null,
            membershipDuration: 1,
            password: null,
            passwordAgain: null,
            success: null,
            message: null,
        };
    }

    handleRegistration = async event => {
        event.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            utuAccount: this.state.utuAccount,
            email: this.state.email,
            hometown: this.state.hometown,
            tyyMember: this.state.tyyMember,
            tiviaMember: this.state.tiviaMember,
            membershipDuration: this.state.membershipDuration,
            password: this.state.password,
            passwordAgain: this.state.passwordAgain,
        };

        try {
            const response = await api.post('/register', data, {
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
                this.props.history.push("/");
            }
        } catch (e) {
            this.setState({
                ...this.state,
                ...{
                    success: false,
                    message: 'Pyyntö rekisteröitymiselle epäonnistui.',
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
            <RegisterView
                handleRegistration={this.handleRegistration}
                handleInputChange={this.handleInputChange}
                membershipDuration={this.state.membershipDuration}
                message={this.state.message}
                success={this.state.isSuccess}
            />
        );
    }
}

export default RegisterComponent;
