import React, { Component } from 'react';

import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import ImageLoader from '../../commons/imageLoader/imageLoaderComponent';

import api from '../../../utils/api';
import './Banks.css';

import { Button, Card, Row, Col, Alert } from 'react-bootstrap';

class BanksComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            id: this.props.memberId,
            success: null,
            message: null,
            banks: null,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            hometown: this.props.hometown,
            email: this.props.email,
            productId: this.props.productId,
        };
    }

    render() {
        const { isLoading, banks, message, success } = this.state;

        if (isLoading === true) {
            return <PreloaderComponent size="small" />;
        }

        if (message && !success) {
            return (
                <div className="container">
                    <Alert variant={!success ? 'danger' : 'success'}>
                        {message}
                    </Alert>
                </div>
            );
        }

        return (
            <div className="container">
                <Card>
                    <Card.Body>
                        <Card.Title>Valitse maksutapa</Card.Title>
                        <Row>
                            {banks.map(function(provider) {
                                return (
                                    <Col lg={3} md={4} sm={4} xs={6} key={provider.name}>
                                        <form
                                            key={provider.name}
                                            method="POST"
                                            action={provider.url}
                                        >
                                            {provider.parameters.map(function(
                                                param
                                            ) {
                                                return (
                                                    <input
                                                        key={param.name}
                                                        type="hidden"
                                                        name={param.name}
                                                        value={param.value}
                                                    />
                                                );
                                            })}
                                            <Button
                                                type="submit"
                                                variant="light"
                                            >
                                                <ImageLoader
                                                    src={provider.icon}
                                                    alt={provider.name}
                                                />
                                            </Button>
                                        </form>
                                    </Col>
                                );
                            })}
                        </Row>
                        <Card.Link className="btn btn-success" href="/">Peruuta</Card.Link>
                    </Card.Body>
                </Card>
                <div className="paytrail-terms mt-3">
                    <strong>Maksupalvelutarjoaja</strong><br/>
                    Maksunvälityspalvelun toteuttajana ja maksupalveluntarjoajana toimii Paytrail Oyj (2122839-7) yhteistyössä suomalaisten pankkien ja luottolaitosten kanssa. Paytrail Oyj näkyy maksun saajana tiliotteella tai korttilaskulla ja välittää maksun kauppiaalle. Paytrail Oyj:llä on maksulaitoksen toimilupa. Reklamaatiotapauksissa pyydämme ottamaan ensisijaisesti yhteyttä tuotteen toimittajaan. <br/>
                    Paytrail Oyj, y-tunnus: 2122839-7 <br/>
                    Innova 2, Lutakonaukio 7, 40100 Jyväskylä <br/>
                    <a href="https://www.paytrail.com/kuluttaja/tietoa-maksamisesta" target="_blank">Tietoa maksamisesta</a>
                </div>
                <div className="payment-terms mt-3">
                    <strong>Ehdot:</strong><br/>
                    Yhdistyksen hallitus päättää jäsenyyden hyväksymisestä. Jos jäsenyys hylätään, jäsenmaksu palautetaan. Yhdistyksestä eroamisesta löytyy tietoa yhdistyksen säännöistä.
                </div>
            </div>
        );
    }

    async componentDidMount() {
        const data = {
            memberId: this.state.id,
            productId: this.props.productId,
        };

        try {
            const response = await api.post('/pay/', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.setState({
                ...this.state,
                ...{
                    isLoading: false,
                    banks: response.data,
                    message: response.data.message,
                    success: response.data.success,
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
