import React, { Component } from 'react';

import MemberUpdateAdminView from './memberUpdateAdminView';
import HeaderComponent from '../../commons/header/headerComponent';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import MemberNotFoundComponent from '../../commons/memberNotFound/memberNotFoundComponent';

import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

class MemberUpdateAdminComponent extends Component {
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
            accepted: null,
            password: null,
            passwordAgain: null,
            success: null,
            message: null,
            showModal: false,
            memberNotFound: false,
        };
        this.handleMembershipStartsChange = this.handleMembershipStartsChange.bind(this);
        this.handleMembershipEndsChange = this.handleMembershipEndsChange.bind(this);
    }

    handleUpdateAdmin = async event => {
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
            accepted: this.state.accepted,
            id: this.state.id,
            memberID: this.state.memberID,
        };

        try {
            const response = await api.put('/admin/update', data, {
                headers: {
                    Authorization: getCookie('jasenrekisteri-token'),
                    'Content-Type': 'application/json',
                },
            });
            let modal = false;
            if (response.data.success && response.data.message) {
                modal = true;
            }
            this.setState({
                ...this.state,
                ...{
                    isLoading: false,
                    success: response.data.success,
                    message: response.data.message,
                    showModal: modal,
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
    }

    handleMembershipEndsChange = date => {
        this.setState({
            membershipEnds: date,
        });
    }

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

    matchPassword = value => {
        if (value || this.state.password) {
            return value === this.state.password;
        } else {
            return true;
        }
    };

    render() {
        let modalClose = () => this.setState({ showModal: false });
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
            success,
            message,
            memberID,
            showModal,
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
                <Modal
                    show={showModal}
                    onHide={modalClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Ilmoitus
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link className="btn btn-success" to={`/member/details/${memberID}`}>
                            Takaisin
                        </Link>
                    </Modal.Footer>
                </Modal>
                <MemberUpdateAdminView
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
                    handleUpdateAdmin={this.handleUpdateAdmin}
                    roleSwitchCase={this.roleSwitchCase}
                    handleInputChange={this.handleInputChange}
                    handleMembershipStartsChange={this.handleMembershipStartsChange}
                    handleMembershipEndsChange={this.handleMembershipEndsChange}
                    matchPassword={this.matchPassword}
                    success={success}
                    message={message}
                    memberID={memberID}
                />
            </div>
        );
    }

    async componentDidMount() {
        try {
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
                    message: 'Pyyntö tietojen hakemiselle epäonnistui.',
                    isLoading: false,
                    memberNotFound: true,
                },
            });
        }
    }
}

export default MemberUpdateAdminComponent;
