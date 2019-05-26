import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import HeaderComponent from '../commons/header/headerComponent';
import MemberListComponent from './memberList/memberListComponent';

import { getCookie } from '../../utils/cookies';

class ControlComponent extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                {getCookie('role').toLowerCase() === 'admin' ||
                getCookie('role').toLowerCase() === 'board' ? (
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
