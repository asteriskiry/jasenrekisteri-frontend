import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    adminProfileAction,
    adminProfileUpdateAction,
} from '../../../../actions/adminActions';
import AdminUpdateView from './adminUpdateView';
import HeaderComponent from '../../../commons/header/headerComponent';

import { getCookie } from '../../../../utils/cookies';

class AdminUpdateComponent extends Component {
    state = {
        data: {
            id: getCookie('id'),
            access: getCookie('role'),
            memberID: this.props.match.params.id,
        }
    }

    constructor(props) {
        super(props);
        this.props.dispatch(adminProfileAction(this.state.data));
    }

    handleUpdateAdmin = event => {
        event.preventDefault();
        const data = {
            firstName: event.target.firstName.value,
            email: event.target.email.value,
            role: event.target.role.value,
            password: event.target.password.value,
            access: getCookie('role'),
            id: getCookie('id'),
        };

        this.props.dispatch(adminProfileUpdateAction(data));
    };

    render() {
        console.log(this.props);
        let success, message;
        if (this.props.updateProfile.hasOwnProperty('action')) {
            success = this.props.updateProfile.action.response.success;
            message = this.props.updateProfile.action.response.message;
        }

        return (
            <div>
                <HeaderComponent />
                <AdminUpdateView
                    profile={this.props.profile.response}
                    handleUpdateAdmin={this.handleUpdateAdmin}
                    success={success}
                    message={message}
                />
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AdminUpdateComponent);
