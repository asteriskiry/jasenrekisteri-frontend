import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import LoginComponent from '../components/authentications/login/loginComponent';
import RegisterComponent from '../components/authentications/register/registerComponent';
import ForgotComponent from '../components/authentications/forgot/forgotComponent';
import ResetComponent from '../components/authentications/forgot/resetComponent';
import LogoutComponent from '../components/authentications/logoutComponent';
import ControlComponent from '../components/admin/controlComponent';
import AdminUpdateComponent from '../components/admin/profileUpdate/adminUpdateComponent';
import AddMemberComponent from '../components/admin/addMember/addMemberComponent';

import MemberDetailsComponent from '../components/member/details/memberDetailsComponent';
import MemberDetailsUpdateComponent from '../components/member/details/memberDetailsUpdateComponent';
import ProfileComponent from '../components/member/profile/profileComponent';
import NotFoundComponent from '../components/notFoundComponent';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCheck,
    faTimes,
    faSignInAlt,
    faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

library.add(faCheck, faTimes, faSignInAlt, faExclamationTriangle);

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" exact={true} component={LoginComponent} />
                        <Route path="/register" component={RegisterComponent} />
                        <Route path="/forgot" component={ForgotComponent} />
                        <Route path="/reset/:id/:token" exact={true} component={ResetComponent} />

                        <PrivateRoute path="/logout" component={LogoutComponent} />
                        <PrivateRoute path="/admin" exact={true} component={ControlComponent} />
                        <PrivateRoute path="/admin/new" component={AddMemberComponent} />
                        <PrivateRoute path="/profile/update/:id" component={AdminUpdateComponent} />

                        <PrivateRoute path="/member/details/:id" component={MemberDetailsComponent} />
                        <PrivateRoute path="/member/update/:id" component={MemberDetailsUpdateComponent} />
                        <PrivateRoute path="/member" component={ProfileComponent} />

                        <Route component={NotFoundComponent} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
