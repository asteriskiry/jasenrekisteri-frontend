import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    memberDetailsAction,
    memberUpdateAction,
} from '../../../actions/membersActions';

import HeaderComponent from '../../commons/header/headerComponent';
import MemberDetailsUpdateView from './memberDetailsUpdateView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';

class MemberDetailsUpdateComponent extends Component {
    state = {
        isSuccess: false,
        message: '',
        user: {},
    };

    componentDidMount() {
        this.props.dispatch(
            memberDetailsAction({ memberID: this.props.match.params.id })
        );
    }

    onHandleUpdateMember = event => {
        event.preventDefault();

        let firstName = event.target.firstName.value;
        let lastName = event.target.lastName.value;
        let utuAccount = event.target.utuAccount.value;
        let email = event.target.email.value;
        let hometown = event.target.hometown.value;
        let tyyMember = event.target.tyyMember.checked;
        let tiviaMember = event.target.tiviaMember.checked;
        let password = event.target.password.value;
        let passwordAgain = event.target.passwordAgain.value;
        let _id = this.props.response.details.response._id;

        const data = {
            firstName,
            lastName,
            utuAccount,
            email,
            hometown,
            tyyMember,
            tiviaMember,
            password,
            passwordAgain,
            _id,
        };

        this.props.dispatch(memberUpdateAction(data));
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.response.update.hasOwnProperty('response')) {
            if (
                nextProps.response.update.response.success !==
                prevState.isSuccess
            ) {
                return {
                    isSuccess: nextProps.response.update.response.success,
                    message: nextProps.response.update.response.message,
                    user: nextProps.response.details.response,
                };
            } else {
                return {
                    isSuccess: nextProps.response.update.response.success,
                    message: nextProps.response.update.response.message,
                };
            }
        } else {
            return null;
        }
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

    render() {
        if (this.props.response.details.response === undefined) {
            return <PreloaderComponent />;
        }

        return (
            <div>
                <HeaderComponent />
                <MemberDetailsUpdateView
                    message={this.state.message}
                    success={this.state.isSuccess}
                    handleUpdateMember={this.onHandleUpdateMember}
                    user={this.props.response.details.response}
                    roleSwitchCase={this.roleSwitchCase}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    response: state,
});

export default connect(mapStateToProps)(MemberDetailsUpdateComponent);
