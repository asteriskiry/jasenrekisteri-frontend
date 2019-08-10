import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            role: 'Member',
            accessRights: null,
            membershipStarts: null,
            membershipEnds: null,
            accepted: null,
            success: null,
            message: null,
            showModal: false,
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
            accepted: this.state.accepted,
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

    matchPassword = value => {
        return value && value === this.state.password;
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
        } = this.state;

        if (isLoading === true) {
            return <PreloaderComponent />;
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
                        <Link className="btn btn-success" to="/admin">
                            Takaisin
                        </Link>
                    </Modal.Footer>
                </Modal>
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
                    accepted={accepted}
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
                    matchPassword={this.matchPassword}
                />
            </div>
        );
    }
}

export default NewMemberComponent;
