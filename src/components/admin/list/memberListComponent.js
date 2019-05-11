import React, { Component } from 'react';
import { connect } from 'react-redux';

import { memberListAction } from '../../../actions/adminActions';
import MemberListView from './memberListView';
import { getCookie } from '../../../utils/cookies';

class MemberListComponent extends Component {

    state = {
        members: undefined,
        data: {
            id: getCookie('id'),
            access: getCookie('role')
        }
    }

    constructor(props) {
        super(props);
        this.props.dispatch(memberListAction(this.state.data));
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            members: nextProps.response.list.response
        };
    }

    render() {
        return (
            <div>
                <MemberListView
                    list={this.state.members}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    response: state
});

export default connect(mapStateToProps)(MemberListComponent);
