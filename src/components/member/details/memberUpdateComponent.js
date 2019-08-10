import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import HeaderComponent from '../../commons/header/headerComponent';
import MemberUpdateView from './memberUpdateView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import MemberNotFoundComponent from '../../commons/memberNotFound/memberNotFoundComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

class MemberUpdateComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            id: getCookie('id'),
            firstName: null,
            lastName: null,
            utuAccount: null,
            email: null,
            hometown: null,
            tyyMember: null,
            tiviaMember: null,
            password: null,
            passwordAgain: null,
            success: null,
            message: null,
            showModal: false,
            memberNotFound: false,
        };
    }

    handleUpdateMember = async event => {
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
        };

        try {
            const response = await api.put('/member/details', data, {
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
            success,
            message,
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
                        <Link className="btn btn-success" to="/member">
                            Takaisin
                        </Link>
                    </Modal.Footer>
                </Modal>
                <MemberUpdateView
                    isLoading={isLoading}
                    firstName={firstName}
                    lastName={lastName}
                    utuAccount={utuAccount}
                    email={email}
                    hometown={hometown}
                    tyyMember={tyyMember}
                    tiviaMember={tiviaMember}
                    handleInputChange={this.handleInputChange}
                    success={success}
                    message={message}
                    handleUpdateMember={this.handleUpdateMember}
                    matchPassword={this.matchPassword}
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

export default MemberUpdateComponent;
