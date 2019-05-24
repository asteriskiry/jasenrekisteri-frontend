import React, { Component } from 'react';
import ResetView from './resetView';
import api from '../../../utils/api';

class ResetComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            message: null,
            password: null,
            passwordAgain: null,
        };
    }

    handleReset = async event => {
        event.preventDefault();

        let userID = this.props.match.params.id;
        let resetToken = this.props.match.params.token;
        let password = this.state.password;
        let passwordAgain = this.state.passwordAgain;
        const data = {
            userID,
            resetToken,
            password,
            passwordAgain,
        };
        try {
            const response = await api.post('/reset', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.setState({
                ...this.state,
                ...{
                    success: response.data.success,
                    message: response.data.message,
                },
            });
        } catch (e) {
            this.setState({
                ...this.state,
                ...{
                    success: false,
                    message: 'Pyyntö salasanan päivitykselle epäonnistui.',
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
        const { success, message } = this.state;

        return (
            <ResetView
                success={success}
                message={message}
                handleInputChange={this.handleInputChange}
                handleReset={this.handleReset}
            />
        );
    }
}

export default ResetComponent;
