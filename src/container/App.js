import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './privateRoute';

import LoginComponent from '../components/authentications/login/loginComponent';
import RegisterComponent from '../components/authentications/register/registerComponent';
import ForgotComponent from '../components/authentications/forgot/forgotComponent';
import ResetComponent from '../components/authentications/forgot/resetComponent';
import LogoutComponent from '../components/authentications/logoutComponent';

import ControlComponent from '../components/admin/controlComponent';
import AddMemberComponent from '../components/admin/addMember/addMemberComponent';
import MemberDetailsAdminComponent from '../components/admin/memberDetails/memberDetailsAdminComponent';
import MemberUpdateAdminComponent from '../components/admin/memberDetails/memberUpdateAdminComponent';

import MemberUpdateComponent from '../components/member/details/memberUpdateComponent';
import MemberDetailsComponent from '../components/member/details/memberDetailsComponent';
import MemberPayComponent from '../components/member/payment/memberPayComponent';
import payReturnComponent from '../components/member/payment/payReturnComponent';
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
                        <Route path="/join" component={RegisterComponent} />
                        <Route path="/forgot" component={ForgotComponent} />
                        <Route path="/reset/:id/:token" exact={true} component={ResetComponent} />
                        <PrivateRoute path="/logout" component={LogoutComponent} />

                        <PrivateRoute path="/admin" exact={true} component={ControlComponent} />
                        <PrivateRoute path="/admin/new" component={AddMemberComponent} />
                        <PrivateRoute path="/profile/update/:id" component={MemberUpdateAdminComponent} />
                        <PrivateRoute path="/member/details/:id" component={MemberDetailsAdminComponent} />

                        <PrivateRoute path="/member/update/:id" component={MemberUpdateComponent} />
                        <Route path="/member/pay/return" component={payReturnComponent} />
                        <PrivateRoute path="/member/pay" component={MemberPayComponent} />
                        <PrivateRoute path="/member" component={MemberDetailsComponent} />

                        <Route component={NotFoundComponent} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
