import React, { Component } from 'react';
import HeaderComponent from '../../commons/header/headerComponent';
import { adminProfileAction } from '../../../actions/adminActions';
import { connect } from 'react-redux';
import { getCookie } from '../../../utils/cookies';
import AdminProfileView from './adminProfileView';
import PreloaderComponent from '../../commons/preloader/preloaderComponent';

class AdminProfileComponent extends Component {
    constructor(props) {
        super(props);

        this.props.dispatch(
            adminProfileAction({
                id: getCookie('id'),
                access: getCookie('role'),
                memberID: this.props.match.params.id,
            })
        );
    }

    render() {
        if (this.props.profile.action === undefined) {
            return <PreloaderComponent />;
        }
        return (
            <div>
                <HeaderComponent />
                <AdminProfileView
                    profile={this.props.profile.response}
                    match={this.props.match}
                />
            </div>
        );
    }
}

const mapStateToPrope = state => state;

export default connect(mapStateToPrope)(AdminProfileComponent);
