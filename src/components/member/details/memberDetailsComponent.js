import React, { Component } from 'react';

import HeaderComponent from '../../commons/header/headerComponent';
import MemberDetailsView from './memberDetailsView';
import DialogComponent from '../../commons/dialog/dialogComponent';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

class MemberDetailsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
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
            role: null,
            accessRights: null,
            membershipStarts: null,
            membershipEnds: null,
            accountCreated: null,
            password: null,
            passwordAgain: null,
            success: null,
            message: null,
            warning: false,
            dialogMessage: '',
        };
    }

    onHandleRemove = () => {
        this.setState({
            warning: true,
            dialogMessage: `Haluatko varmasti poistaa jäsenen ${
                this.state.firstName
            } ${this.state.lastName}?`,
        });
    };

    handleRemove = async event => {
        const response = event.target.innerHTML.toLowerCase();

        if (response === 'kyllä') {
            const data = {
                access: getCookie('role'),
                id: getCookie('id'),
                memberID: this.state.memberID,
            };
            try {
                const response = await api.post('/admin/remove', data, {
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
                        message: 'Pyyntö jäsenen poistolle epäonnistui.',
                        isLoading: false,
                    },
                });
            }
        }

        this.setState({
            warning: false,
            dialogMessage: '',
        });
    };

    roleSwitchCase(role) {
        switch (role.toLowerCase()) {
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
        let modalClose = () => this.setState({ warning: false });
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
            accountCreated,
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
                <DialogComponent
                    show={this.state.warning}
                    onHide={modalClose}
                    message={this.state.dialogMessage}
                    callback={this.handleRemove.bind(this)}
                />
                <MemberDetailsView
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
                    success={success}
                    message={message}
                    memberID={memberID}
                    handleRemove={this.onHandleRemove.bind(this)}
                    accountCreated={accountCreated}
                />
            </div>
        );
    }
    async componentDidMount() {
        try {
            let profileData = await api.get('/member/details', {
                headers: {
                    Authorization: getCookie('jasenrekisteri-token'),
                    'Content-Type': 'application/json',
                },
                params: {
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
            const membershipStarts = profileData.membershipStarts;
            const membershipEnds = profileData.membershipEnds;
            const accountCreated = profileData.accountCreated;

            this.setState({
                ...this.state,
                ...{
                    isLoading: false,
                    success: true,
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
                    accountCreated,
                },
            });
        } catch (e) {
            this.setState({
                ...this.state,
                ...{
                    success: false,
                    message: 'Pyyntö tietojen hakemiseen epäonnistui.',
                    isLoading: false,
                },
            });
        }
    }
}

export default MemberDetailsComponent;
