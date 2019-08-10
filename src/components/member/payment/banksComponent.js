import React, { Component } from 'react';

import PreloaderComponent from '../../commons/preloader/preloaderComponent';

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
                                    <Col key={provider.name}>
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
                                                <img
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
