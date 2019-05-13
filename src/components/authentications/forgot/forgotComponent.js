import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import MainComponent from '../../commons/main/mainComponent';

import { forgotPasswordAction } from '../../../actions/authenticationActions';

class ForgotComponent extends Component {
    state = {
        success: false,
        message: '',
    };

    renew = event => {
        event.preventDefault();
        const data = {
            password: event.target.password.value,
            username: event.target.username.value,
        };

        this.props.dispatch(forgotPasswordAction(data));
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.forgot.hasOwnProperty('response')) {
            if (nextProps.forgot.response.success !== prevState.success) {
                return {
                    success: nextProps.forgot.response.success,
                    message: nextProps.forgot.response.message,
                };
            } else {
                return {
                    success: nextProps.forgot.response.success,
                    message: nextProps.forgot.response.message,
                };
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <MainComponent>
                {this.state.message ? (
                    <Alert variant={!this.state.success ? 'danger' : 'success'}>
                        {this.state.message}
                    </Alert>
                ) : null}
                <form onSubmit={this.renew.bind(this)}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Sähköpostiosoite"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Uusi salasana"
                    />
                    <Button variant="success">Vaihda salasana</Button>
                </form>
                <hr />
                <div className="btm-links">
                    <p>
                        <Link to="/">Takaisin</Link>
                    </p>
                </div>
            </MainComponent>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ForgotComponent);
