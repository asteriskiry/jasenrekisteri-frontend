import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import queryString from 'query-string';
import moment from 'moment';

import HeaderComponent from '../../commons/header/headerComponent';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import NotFoundComponent from '../../notFoundComponent';

import api from '../../../utils/api';

class payReturnComponent extends Component {
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
            paymentData: null,
            invalidUrlParams: false,
        };
    }

    render() {
        const {
            isLoading,
            message,
            success,
            paymentData,
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
                    {paymentData ? (
                        <div>
                            <p>
                                Kiitos maksustasi. Jäsenyytesi on uusi
                                päättymispäivä on <strong>{moment(paymentData.membershipEnds).format('DD.MM.YYYY')}</strong>. Kuitti maksusta on lähetetty sähköpostiisi.
                            </p>
                            <h3>Maksun tiedot:</h3>
                            <ul>
                                <li><strong>Maksajan nimi: </strong>{paymentData.firstName + ' ' + paymentData.lastName}</li>
                                <li><strong>Maksajan sähköpostiosoite: </strong>{paymentData.email}</li>
                                <li><strong>Tuote: </strong>{paymentData.product}</li>
                                <li><strong>Uusi jäsenyyden päättymispäivä: </strong>{moment(paymentData.membershipEnds).format('DD.MM.YYYY')}</li>
                                <li><strong>Maksun aikaleima: </strong>{moment(paymentData.timestamp).format('DD.MM.YYYY HH:mm:ss')}</li>
                                <li><strong>Maksun määrä: </strong>{paymentData.amount / 100} €</li>
                            </ul>
                        </div>
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
            let response = await api.post('/pay/payment-return', data, {
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
                    paymentData: response.data.paymentData,
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

export default payReturnComponent;
