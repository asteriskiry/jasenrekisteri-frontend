import React, { Component } from 'react';

import RegisterView from './registerView';
import BanksComponent from '../../member/payment/banksComponent';
import MainComponent from '../../commons/main/mainComponent';

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
            tyyMember: false,
            tiviaMember: false,
            productId: '1111',
            success: null,
            showBanks: false,
            memberId: null,
            paymentToken: null,
            message: null,
            acceptTerms: false,
        };
    }

    handleRegistration = async (event) => {
        event.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            utuAccount: this.state.utuAccount,
            email: this.state.email,
            hometown: this.state.hometown,
            tyyMember: this.state.tyyMember,
            tiviaMember: this.state.tiviaMember,
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
                    memberId: response.data.memberId,
                    paymentToken: response.data.paymentToken,
                    showBanks: !!response.data.success,
                },
            });
        } catch (e) {
            this.setState({
                ...this.state,
                ...{
                    success: false,
                    message:
                        e.response?.data?.error?.message ||
                        'Pyyntö jäseneksi liittymiselle epäonnistui.',
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

    render() {
        return (
            <div>
                {this.state.showBanks ? (
                    <MainComponent big="true">
                        <BanksComponent
                            productId={this.state.productId}
                            memberId={this.state.memberId}
                            paymentToken={this.state.paymentToken}
                        />
                    </MainComponent>
                ) : (
                    <RegisterView
                        handleRegistration={this.handleRegistration}
                        handleInputChange={this.handleInputChange}
                        productId={this.state.productId}
                        message={this.state.message}
                        success={this.state.success}
                    />
                )}
            </div>
        );
    }
}

export default RegisterComponent;
