import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUserAction } from '../../../actions/authenticationActions';
import RegisterView from './registerView';

class RegisterComponent extends Component {
    state = {
        isSuccess: false,
        message: '',
    };

    onHandleRegistration = event => {
        event.preventDefault();

        let firstName = event.target.firstName.value;
        let lastName = event.target.lastName.value;
        let utuAccount = event.target.utuAccount.value;
        let email = event.target.email.value;
        let hometown = event.target.hometown.value;
        let tyyMember = event.target.tyyMember.checked;
        let tiviaMember = event.target.tiviaMember.checked;
        let password = event.target.password.value;
        let passwordAgain = event.target.passwordAgain.value;

        const data = {
            firstName,
            lastName,
            utuAccount,
            email,
            hometown,
            tyyMember,
            tiviaMember,
            password,
            passwordAgain,
        };

        this.props.dispatch(registerUserAction(data));
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.response.register.hasOwnProperty('response')) {
            if (
                nextProps.response.register.response.success !==
                prevState.isSuccess
            ) {
                return {
                    isSuccess: nextProps.response.register.response.success,
                    message: nextProps.response.register.response.message,
                };
            } else {
                return {
                    isSuccess: nextProps.response.register.response.success,
                    message: nextProps.response.register.response.message,
                };
            }
        } else {
            return null;
        }
    }

    render() {
        if (this.state.isSuccess) {
            return <Redirect to="/" />;
        }

        return (
            <RegisterView
                handleRegistration={this.onHandleRegistration}
                message={this.state.message}
                success={this.state.isSuccess}
            />
        );
    }
}

const mapStateToProps = response => ({
    response,
});

export default connect(mapStateToProps)(RegisterComponent);
