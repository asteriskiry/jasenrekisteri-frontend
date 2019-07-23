import React, { Component } from 'react';

import PreloaderComponent from '../../commons/preloader/preloaderComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

import { Button, Jumbotron, Row, Col } from 'react-bootstrap';

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
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            hometown: this.props.hometown,
            email: this.props.email,
            membershipLength: this.props.membershipLength,
        };
    }

    render() {
        const { isLoading, banks } = this.state;

        if (isLoading === true) {
            return <PreloaderComponent />;
        }

        return (
            <div className="container">
                <Jumbotron>
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
                                        <Button variant="light">
                                            <img src={provider.icon} />
                                        </Button>
                                    </form>
                                </Col>
                            );
                        })}
                    </Row>
                </Jumbotron>
            </div>
        );
    }

    async componentDidMount() {
        console.log(this.props);
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            hometown: this.state.hometown,
            id: this.state.id,
            membershipLength: this.props.membershipLength,
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
