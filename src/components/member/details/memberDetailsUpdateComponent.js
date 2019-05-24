import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import HeaderComponent from '../../commons/header/headerComponent';
import MemberDetailsUpdateView from './memberDetailsUpdateView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

class MemberDetailsUpdateComponent extends Component {
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
            this.setState({
                ...this.state,
                ...{
                    isLoading: false,
                    success: response.data.success,
                    message: response.data.message,
                    showModal: true,
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
    }

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
        } = this.state;

        if (isLoading === true) {
            return <PreloaderComponent />;
        }

        return (
            <div>
                <HeaderComponent />
                <Modal
                    show={(showModal && success && message)}
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
                        <Link className="btn btn-success" to='/member'>
                            Takaisin
                        </Link>
                    </Modal.Footer>
                </Modal>
                <MemberDetailsUpdateView
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

export default MemberDetailsUpdateComponent;
