import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import HeaderComponent from '../commons/header/headerComponent';
import ListComponent from './list/memberListComponent';

import { getCookie } from '../../utils/cookies';

class ControlComponent extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                {(getCookie('role').toLowerCase() === 'admin') | 'board' ? (
                    <div className="control">
                        <ListComponent />
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
