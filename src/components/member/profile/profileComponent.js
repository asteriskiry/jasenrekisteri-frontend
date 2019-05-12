import React, { Component } from 'react';
import { connect } from 'react-redux';

import { memberDetailsAction } from '../../../actions/membersActions';
import HeaderComponent from '../../commons/header/headerComponent';
import ProfileView from './profileView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';
import { getCookie } from '../../../utils/cookies';

class ProfileComponent extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        const data = {
            memberID: getCookie('id'),
            admin: {
                id: getCookie('id'),
                access: getCookie('role')
            }
        };

        this.props.dispatch(memberDetailsAction(data));
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.details.hasOwnProperty('response')) {
            return {
                user: nextProps.details.response
            }
        } else {
            return null;
        }
    }

    render() {
        if (this.props.details.response === undefined) {
            return <PreloaderComponent />
        }

        return (
            <div>
                <HeaderComponent />
                <ProfileView user={this.props.details.response} />
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(ProfileComponent);
