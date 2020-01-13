import React, { Component } from 'react';

import HeaderComponent from '../../commons/header/headerComponent';
import MemberCardView from './memberCardView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import MemberNotFoundComponent from '../../commons/memberNotFound/memberNotFoundComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

class MemberCardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            id: getCookie('id'),
            access: getCookie('role'),
            firstName: null,
            lastName: null,
            role: null,
            accessRights: null,
            membershipStarts: null,
            membershipEnds: null,
            accepted: null,
            success: null,
            message: null,
            memberNotFound: false,
        };
    }

    roleSwitchCase(role) {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'Hallitus';
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
            role,
            accessRights,
            membershipStarts,
            membershipEnds,
            accepted,
            memberNotFound,
        } = this.state;

        if (isLoading === true) {
            return <PreloaderComponent />;
        }

        if (memberNotFound) {
            return (
                <div>
                    <HeaderComponent /> <MemberNotFoundComponent />
                </div>
            );
        }

        return (
            <div>
                <HeaderComponent />
                <MemberCardView
                    isLoading={isLoading}
                    firstName={firstName}
                    lastName={lastName}
                    role={role}
                    accessRights={accessRights}
                    membershipStarts={membershipStarts}
                    membershipEnds={membershipEnds}
                    accepted={accepted}
                    roleSwitchCase={this.roleSwitchCase}
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
                    memberID: this.state.id,
                },
            });

            profileData = profileData.data;
            const firstName = profileData.firstName;
            const lastName = profileData.lastName;
            const role = profileData.role;
            const accessRights = profileData.accessRights;
            const membershipStarts = profileData.membershipStarts;
            const membershipEnds = profileData.membershipEnds;
            const accepted = profileData.accepted;
            const memberNotFound = profileData.memberNotFound;

            this.setState({
                ...this.state,
                ...{
                    isLoading: false,
                    success: true,
                    firstName,
                    lastName,
                    role,
                    accessRights,
                    membershipStarts,
                    membershipEnds,
                    accepted,
                    memberNotFound,
                },
            });
        } catch (e) {
            this.setState({
                ...this.state,
                ...{
                    success: false,
                    message: 'Pyyntö tietojen hakemiseen epäonnistui.',
                    isLoading: false,
                    memberNotFound: true,
                },
            });
        }
    }
}

export default MemberCardComponent;
