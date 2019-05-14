import React, { Component } from 'react';
import { connect } from 'react-redux';

import { memberDetailsAction } from '../../../actions/membersActions';
import { memberRemoveAction } from '../../../actions/adminActions';

import HeaderComponent from '../../commons/header/headerComponent';
import MemberDetailsView from './memberDetailsView';
import DialogComponent from '../../commons/dialog/dialogComponent';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';

import { getCookie } from '../../../utils/cookies';

class MemberDetailsComponent extends Component {
    state = {
        isSuccess: false,
        message: '',
        warning: false,
        dialogMessage: '',
    };

    constructor(props) {
        super(props);
        const data = {
            memberID: this.props.match.params.id,
            admin: {
                id: getCookie('id'),
                access: getCookie('role'),
            },
        };
        this.props.dispatch(memberDetailsAction(data));
    }

    onHandleRemove = () => {
        this.setState({
            warning: true,
            dialogMessage: `Haluatko varmasti poistaa jäsenen ${
                this.props.response.details.response.firstName
            } ${this.props.response.details.response.lastName}?`,
        });
    };

    handleRemove = event => {
        const response = event.target.innerHTML.toLowerCase();

        if (response === 'kyllä') {
            const data = {
                admin: {
                    access: getCookie('role'),
                    id: getCookie('id'),
                },
                id: this.props.response.details.response._id,
            };

            this.props.dispatch(memberRemoveAction(data));
        }

        this.setState({
            warning: false,
            dialogMessage: '',
        });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.response.remove.hasOwnProperty('response')) {
            if (
                nextProps.response.remove.response.success !==
                prevState.isSuccess
            ) {
                return {
                    isSuccess: nextProps.response.remove.response.success,
                    message: nextProps.response.remove.response.message,
                };
            } else {
                return {
                    isSuccess: nextProps.response.remove.response.success,
                    message: nextProps.response.remove.response.message,
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
        let modalClose = () => this.setState({ warning: false });
        if (this.props.response.details.response === undefined) {
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
                    success={this.state.isSuccess}
                    message={this.state.message}
                    handleRemove={this.onHandleRemove.bind(this)}
                    member={this.props.response.details.response}
                    roleSwitchCase={this.roleSwitchCase}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    response: state,
});

export default connect(mapStateToProps)(MemberDetailsComponent);
