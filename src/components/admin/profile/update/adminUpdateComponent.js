import React, { Component } from 'react';
import AdminUpdateView from './adminUpdateView';
import HeaderComponent from '../../../commons/header/headerComponent';
import PropTypes from 'prop-types';

import { getCookie } from '../../../../utils/cookies';
import api from '../../../../utils/api';

class AdminUpdateComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            id: getCookie('id'),
            access: getCookie('role'),
            memberID: this.props.match.params.id,
            firstName: null,
            lastName: null,
            uruAccount: null,
            email: null,
            hometown: null,
            tyyMember: null,
            tiviaMember: null,
            role: null,
            accessRights: null,
            password: null,
            passwordAgain: null,
            success: null,
            message: null,
        };
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
    };

    handleChange = event => {
         this.setState({role: event.target.value});
    };

    roleSwitchCase(user) {
        switch (user.role.toLowerCase()) {
            case 'admin':
                return 'Admin';
            case 'board':
                return 'Hallitus';
            case 'functionary':
                return 'Toimihenkilö';
            case 'member':
                return 'Jäsen';
            default:
                return 'Jäsen';
        }
    }

    render() {
        const {
            isLoading,
            firstName,
            lastName,
            utuAccount,
            email,
            hometown,
            tyyMember,
            tiviaMember,
            role,
            accessRights,
            success,
            message,
        } = this.state;

        return (
            <div>
                <HeaderComponent />
                <AdminUpdateView
                    isLoading={isLoading}
                    firstName={firstName}
                    lastName={lastName}
                    utuAccount={utuAccount}
                    email={email}
                    hometown={hometown}
                    tyyMember={tyyMember}
                    tiviaMember={tiviaMember}
                    role={role}
                    accessRights={accessRights}
                    handleUpdateAdmin={this.handleUpdateAdmin}
                    roleSwitchCase={this.roleSwitchCase}
                    success={success}
                    message={message}
                />
            </div>
        );
    }
    async componentDidMount() {
        let profileData = await api.get('/admin/profile', {
            headers: {
                Authorization: getCookie('jasenrekisteri-token'),
                'Content-Type': 'application/json',
            },
            params: {
                id: this.state.id,
                access: this.state.access,
                memberID: this.state.memberID,
            },
        });

        profileData = profileData.data;
        const firstName = profileData.firstName;
        const lastName = profileData.lastName;
        const utuAccount = profileData.utuAccount;
        const email = profileData.email;
        const hometown = profileData.hometown;
        const tyyMember = profileData.tyyMember;
        const tiviaMember = profileData.tiviaMember;
        const role = profileData.role;
        const accessRights = profileData.accessRights;

        this.setState({
            ...this.state,
            ...{
                isLoading: false,
                firstName,
                lastName,
                utuAccount,
                email,
                hometown,
                tyyMember,
                tiviaMember,
                role,
                accessRights,
            },
        });
    }
}

export default AdminUpdateComponent;
