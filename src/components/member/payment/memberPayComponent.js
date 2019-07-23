import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

import HeaderComponent from '../../commons/header/headerComponent';
import MemberPayView from './memberPayView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import MemberNotFoundComponent from '../../commons/memberNotFound/memberNotFoundComponent';
import BanksComponent from './banksComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

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
            showBanks: false,
            membershipLength: "1",
        };
    }

    handleClick = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            ...{
                showBanks: true,
            },
        });
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

    render() {
        const {
            isLoading,
            firstName,
            lastName,
            email,
            hometown,
            memberNotFound,
            showBanks,
            membershipLength,
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
                <MemberPayView />
                {showBanks ? (
                    <BanksComponent
                        membershipLength={membershipLength}
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        hometown={hometown}
                    />
                ) : (
                    <div className="container">
                        <Form onSubmit={this.handleClick}>
                            <Form.Group>
                                <Form.Check
                                    custom
                                    inline
                                    name="membershipLength"
                                    label="1 vuosi"
                                    type="radio"
                                    value="1"
                                    id="1"
                                    onChange={this.handleInputChange}
                                    checked={this.state.membershipLength === "1"}
                                />
                                <Form.Check
                                    custom
                                    inline
                                    name="membershipLength"
                                    label="5 vuotta"
                                    type="radio"
                                    id="5"
                                    value="5"
                                    onChange={this.handleInputChange}
                                    checked={this.state.membershipLength === "5"}
                                />
                            </Form.Group>
                            <Button type="submit" variant="success">
                                Maksa
                            </Button>
                        </Form>
                    </div>
                )}
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
