import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import LoginComponent from '../components/authentications/login/loginComponent';
import RegisterComponent from '../components/authentications/register/registerComponent';
import ForgotComponent from '../components/authentications/forgot/forgotComponent';
import LogoutComponent from '../components/authentications/logoutComponent';
import ControlComponent from '../components/admin/controlComponent';
import AdminProfileComponent from '../components/admin/profile/adminProfileComponent';
import AdminUpdateComponent from '../components/admin/profile/update/adminUpdateComponent';
import AddMemberComponent from '../components/admin/addMember/addMemberComponent';

import MemberDetailsComponent from '../components/member/details/memberDetailsComponent';
import MemberDetailsUpdateComponent from '../components/member/details/memberDetailsUpdateComponent';
import ProfileComponent from '../components/member/profile/profileComponent';
import NotFoundComponent from '../components/notFoundComponent';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/' exact={true} component={LoginComponent} />
                        <Route path='/register' component={RegisterComponent} />
                        <Route path='/forgot' component={ForgotComponent} />
                        <PrivateRoute path='/logout' component={LogoutComponent} />
                        <PrivateRoute path='/admin' component={ControlComponent} />
                        <PrivateRoute path='/admin/new' component={AddMemberComponent} />
                        <PrivateRoute path='/admin/profile' component={AdminProfileComponent} />
                        <PrivateRoute path='/profile/update/:id' component={AdminUpdateComponent} />

                        <PrivateRoute path='/member/details/:id' component={MemberDetailsComponent} />
                        <PrivateRoute path='/member/update/:id' component={MemberDetailsUpdateComponent} />
                        <PrivateRoute path='/member' component={ProfileComponent} />

                        <Route component={NotFoundComponent} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
