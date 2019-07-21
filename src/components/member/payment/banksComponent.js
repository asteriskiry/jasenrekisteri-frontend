import React, { Component } from 'react';

import HeaderComponent from '../../commons/header/headerComponent';
import MemberPayView from './memberPayView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import MemberNotFoundComponent from '../../commons/memberNotFound/memberNotFoundComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

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

        return (
            <div className="container">
                {banks.map(function(provider) {
                    return (
                        <form
                            key={provider.name}
                            method="POST"
                            action={provider.url}
                        >
                            {provider.parameters.map(function(param) {
                                return (
                                    <input
                                        key={param.name}
                                        type="hidden"
                                        name={param.name}
                                        value={param.value}
                                    />
                                );
                            })}
                            <button>
                                <img src={provider.icon} />
                            </button>
                        </form>
                    );
                })}
            </div>
        );
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
            const response = await api.post('/pay/', data, {
                headers: {
                    Authorization: getCookie('jasenrekisteri-token'),
                    'Content-Type': 'application/json',
                },
            });
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
