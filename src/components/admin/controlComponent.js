import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import HeaderComponent from '../commons/header/headerComponent';
import MemberListComponent from './memberList/memberListComponent';

import { getCurrentUser } from '../../utils/auth';

class ControlComponent extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                {(getCurrentUser()?.role || '').toLowerCase() === 'admin' ||
                (getCurrentUser()?.role || '').toLowerCase() === 'board' ? (
                    <div className="control">
                        <MemberListComponent />
                    </div>
                ) : (
                    <div>
                        <Redirect to="/member" />
                    </div>
                )}
            </div>
        );
    }
}

export default ControlComponent;
