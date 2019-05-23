import React, { Component } from 'react';

import MemberListView from './memberListView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';

import { getCookie } from '../../../utils/cookies';
import api from '../../../utils/api';

class MemberListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            id: getCookie('id'),
            access: getCookie('role'),
            members: null,
            success: null,
            message: undefined,
        };
    }

    render() {
        const {
            isLoading,
            members,
            success,
            message,
        } = this.state;

        if (isLoading === true) {
            return <PreloaderComponent />;
        }

        return (
            <div>
                <MemberListView
                    list={members}
                    success={success}
                    message={message}
                />
            </div>
        );
    }

    async componentDidMount() {
        try {
            let membersData = await api.get('/admin/list', {
                headers: {
                    Authorization: getCookie('jasenrekisteri-token'),
                    'Content-Type': 'application/json',
                },
                params: {
                    id: this.state.id,
                    access: this.state.access,
                },
            });

            let members = membersData.data;

            this.setState({
                ...this.state,
                ...{
                    isLoading: false,
                    success: true,
                    members,
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

export default MemberListComponent;
