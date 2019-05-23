import React, { Component } from 'react';

import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import ForgotView from './forgotView';

import api from '../../../utils/api';

class ForgotComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            message: null,
            email: null,
        };
    }

    handleForgot = async event => {
        event.preventDefault();

        let email = this.state.email;
        const data = {
            email,
        };
        try {
            const response = await api.post('/forgot', data, {
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
                    message: 'Pyyntö salasanan palauttamiselle epäonnistui.',
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
        const {
            email,
            success,
            message,
        } = this.state;

        return (
            <ForgotView
                email={email}
                success={success}
                message={message}
                handleInputChange={this.handleInputChange}
                handleForgot={this.handleForgot}
            />
        );
    }
}

export default ForgotComponent;
