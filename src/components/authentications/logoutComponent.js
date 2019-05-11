import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie, setCookie } from '../../utils/cookies';
import { connect } from 'react-redux';

class LogoutComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        setCookie('jasenrekisteri-token', getCookie('token'), 0);
        setCookie('role', getCookie('role'), 0);
        setCookie('id', getCookie('id'), 0);

        if (getCookie('jasenrekisteri-token') === null || getCookie('jasenrekisteri-token') === '') {
            return <Redirect to='/' />;
        }

        return <Redirect to='/admin' />
    }
}

export default connect()(LogoutComponent);
