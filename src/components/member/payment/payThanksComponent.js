import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import queryString from 'query-string';

import HeaderComponent from '../../commons/header/headerComponent';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import NotFoundComponent from '../../notFoundComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

class payThanksComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            amount: null,
            stamp: null,
            reference: null,
            transactionId: null,
            status: null,
            provider: null,
            signature: null,
            message: null,
            success: true,
            invalidUrlParams: false,
        };
    }

    render() {
        const {
            isLoading,
            amount,
            stamp,
            reference,
            transactionId,
            status,
            provider,
            signature,
            message,
            success,
            invalidUrlParams,
        } = this.state;

        if (isLoading) {
            return <PreloaderComponent />;
        }

        if (invalidUrlParams) {
            return <NotFoundComponent />;
        }

        return (
            <div>
                <HeaderComponent />
                <div className="container">
                    {message ? (
                        <Alert variant={!success ? 'danger' : 'success'}>
                            {message}
                        </Alert>
                    ) : null}
                </div>
            </div>
        );
    }

    async componentDidMount() {
        const values = queryString.parse(this.props.location.search);

        const data = {
            account: values['checkout-account'],
            algorithm: values['checkout-algorithm'],
            amount: values['checkout-amount'],
            stamp: values['checkout-stamp'],
            reference: values['checkout-reference'],
            transactionId: values['checkout-transaction-id'],
            status: values['checkout-status'],
            provider: values['checkout-provider'],
            signature: values['signature'],
        };

        if (
            !data.account ||
            !data.algorithm ||
            !data.amount ||
            !data.stamp ||
            !data.reference ||
            !data.transactionId ||
            !data.status ||
            !data.provider ||
            !data.signature
        ) {
            this.setState({
                ...this.state,
                ...{
                    isLoading: false,
                    success: true,
                    invalidUrlParams: true,
                },
            });
        } else {
            this.setState({
                ...this.state,
                ...{
                    amount: data.amount,
                    stamp: data.stamp,
                    reference: data.reference,
                    transactionId: data.transactionId,
                    status: data.status,
                    provider: data.provider,
                    signature: data.signature,
                },
            });
        }

        try {
            let response = await api.post('/pay/payment-success', data, {
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

        } catch (e) {
            this.setState({
                ...this.state,
                ...{
                    success: false,
                    message:
                        'Pyyntö serverille epäonnistui. Ota yhteyttä Asteriskin hallitukseen.',
                    isLoading: false,
                },
            });
        }
    }
}

export default payThanksComponent;
