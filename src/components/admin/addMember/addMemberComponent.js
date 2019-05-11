import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../../commons/header/headerComponent';

import { saveMemberAction } from '../../../actions/adminActions';
import AddMemberView from './addMemberView';
import { getCookie } from '../../../utils/cookies';

class NewMemberComponent extends Component {
    state = {
        success: false,
        message: ''
    }

    onHandleAddMember = (event) => {
        event.preventDefault();

        let firstName = event.target.firstName.value;

        const data = {
            firstName,
            admin: {
                access: getCookie('role'),
                id: getCookie('id')
            }
        };

        this.props.dispatch(saveMemberAction(data));
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.response.admin.hasOwnProperty('response')) {
            if (nextProps.response.admin.response.success !== prevState.success) {
                return {
                    success: nextProps.response.admin.response.success,
                    message: nextProps.response.admin.response.message
                };
            } else {
                return {
                    success: nextProps.response.admin.response.success,
                    message: nextProps.response.admin.response.message
                };
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <HeaderComponent />
                <AddMemberView
                    handleAddMember={this.onHandleAddMember}
                    message={this.state.message}
                    success={this.state.success} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    response: state
});

export default connect(mapStateToProps)(NewMemberComponent);
