import React, { Component } from 'react';

import HeaderComponent from '../../commons/header/headerComponent';
import AddMemberView from './addMemberView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

class NewMemberComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            id: getCookie('id'),
            access: getCookie('role'),
            memberID: this.props.match.params.id,
            firstName: null,
            lastName: null,
            utuAccount: null,
            email: null,
            hometown: null,
            tyyMember: null,
            tiviaMember: null,
            role: "Member",
            accessRights: null,
            membershipStarts: null,
            membershipEnds: null,
            password: null,
            passwordAgain: null,
            success: null,
            message: null,
        };
        this.handleMembershipStartsChange = this.handleMembershipStartsChange.bind(
            this
        );
        this.handleMembershipEndsChange = this.handleMembershipEndsChange.bind(
            this
        );
    }

    handleAddMember = async event => {
        event.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            utuAccount: this.state.utuAccount,
            email: this.state.email,
            hometown: this.state.hometown,
            tyyMember: this.state.tyyMember,
            tiviaMember: this.state.tiviaMember,
            role: this.state.role,
            accessRights: this.state.accessRights,
            membershipStarts: this.state.membershipStarts,
            membershipEnds: this.state.membershipEnds,
            password: this.state.password,
            passwordAgain: this.state.passwordAgain,
            access: this.state.access,
            id: this.state.id,
            memberID: this.state.memberID,
        };

        try {
            const response = await api.post('/admin/new', data, {
                headers: {
                    Authorization: getCookie('jasenrekisteri-token'),
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
                    message: 'Pyyntö jäsenen lisäämiselle epäonnistui.',
                    isLoading: false,
                },
            });
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleMembershipStartsChange = date => {
        this.setState({
            membershipStarts: date,
        });
    };

    handleMembershipEndsChange = date => {
        this.setState({
            membershipEnds: date,
        });
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
            membershipStarts,
            membershipEnds,
            success,
            message,
            memberID,
        } = this.state;

        if (isLoading === true) {
            return <PreloaderComponent />;
        }

        return (
            <div>
                <HeaderComponent />
                <AddMemberView
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
                    membershipStarts={membershipStarts}
                    membershipEnds={membershipEnds}
                    roleSwitchCase={this.roleSwitchCase}
                    handleAddMember={this.handleAddMember}
                    handleInputChange={this.handleInputChange}
                    handleMembershipStartsChange={
                        this.handleMembershipStartsChange
                    }
                    handleMembershipEndsChange={this.handleMembershipEndsChange}
                    success={success}
                    message={message}
                    memberID={memberID}
                />
            </div>
        );
    }
}

export default NewMemberComponent;
