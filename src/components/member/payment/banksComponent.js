import React, { Component } from 'react';

import HeaderComponent from '../../commons/header/headerComponent';
import MemberPayView from './memberPayView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import MemberNotFoundComponent from '../../commons/memberNotFound/memberNotFoundComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';
import payment from '../../../utils/payment';

class BanksComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            id: getCookie('id'),
            access: getCookie('role'),
            success: null,
            message: null,
            banks: null,
        };
    }

    render() {
        const { isLoading, banks } = this.state;

        if (isLoading === true) {
            return <PreloaderComponent />;
        }

        let banksHtml = [];
        banksHtml.push(<h4>Valitse maksutapasi</h4>);
        for (var bankName in banks) {
            var bank = banks[bankName];
            let hiddenFields = [];
            for (var key in bank) {
                var value = bank[key];
                if (value === {}) {
                    value = '';
                }
                hiddenFields.push(
                    <input type="hidden" name={key} value={value} />
                );
            }

            banksHtml.push(
                <form action={bank.url} method="post">
                    {' '}
                    {hiddenFields} <input type="image" src={bank.icon} />{' '}
                    <span>{bank.name}</span>{' '}
                </form>
            );
        }
        return <div className="container">{banksHtml}</div>;
    }

    async componentDidMount() {
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            utuAccount: this.state.utuAccount,
            email: this.state.email,
            hometown: this.state.hometown,
            tyyMember: this.state.tyyMember,
            tiviaMember: this.state.tiviaMember,
            password: this.state.password,
            passwordAgain: this.state.passwordAgain,
            id: this.state.id,
            length: this.props.lenght,
        };

        try {
            const response = await payment.post('/', data, {
                headers: {
                    Authorization: getCookie('jasenrekisteri-token'),
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            this.setState({
                ...this.state,
                ...{
                    isLoading: false,
                    banks: response.data,
                },
            });
        } catch (e) {
            this.setState({
                ...this.state,
                ...{
                    success: false,
                    message: 'Pyyntö tietojen päivittämiselle epäonnistui.',
                    isLoading: false,
                },
            });
        }
    }
}

export default BanksComponent;
