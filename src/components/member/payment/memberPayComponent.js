import React, { Component } from 'react';

import HeaderComponent from '../../commons/header/headerComponent';
import MemberPayView from './memberPayView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import MemberNotFoundComponent from '../../commons/memberNotFound/memberNotFoundComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';
import payment from '../../../utils/payment';

class MemberPayComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            id: getCookie('id'),
            access: getCookie('role'),
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
            accepted: null,
            success: null,
            message: null,
            memberNotFound: false,
            banks: null,
        };
    }

    handlePayment = async event => {
        event.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            utuAccount: this.state.utuAccount,
            email: this.state.email,
            hometown: this.state.hometown,
            tyyMember: this.state.tyyMember,
            tiviaMember: this.state.tiviaMember,
            password: this.state.password,
            passwordAgain: this.state.passwordAgain,
            id: this.state.id,
            length: event.target.value,
        };

        try {
            const response = await payment.post('/', data, {
                headers: {
                    Authorization: getCookie('jasenrekisteri-token'),
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
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
    };

    createBanks = banks => {
        let banksHtml = [];
        for (var bankName in banks) {
            var bank = banks[bankName];
            let hiddenFields = [];
            for (var key in bank) {
                var value = bank[key];
                if (value === {}) {
                    value = '';
                }
                hiddenFields.push(
                    <input type="hidden" name={key} value={value} />
                );
            }

            banksHtml.push(
                <form action={bank.url} method="post">
                    {' '}
                    {hiddenFields} <input type="image" src={bank.icon} />{' '}
                    <span>{bank.name}</span>{' '}
                </form>
            );
        }
        return banksHtml;
    };

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
            accepted,
            memberNotFound,
            banks,
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
                <MemberPayView
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
                    accepted={accepted}
                    roleSwitchCase={this.roleSwitchCase}
                    handlePayment={this.handlePayment}
                    banks={banks}
                    createBanks={this.createBanks}
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
            const utuAccount = profileData.utuAccount;
            const email = profileData.email;
            const hometown = profileData.hometown;
            const tyyMember = profileData.tyyMember;
            const tiviaMember = profileData.tiviaMember;
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
                    utuAccount,
                    email,
                    hometown,
                    tyyMember,
                    tiviaMember,
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

export default MemberPayComponent;
