import { combineReducers } from 'redux';

import register from './registerReducer';
import login from './loginReducer';
import forgot from './forgotReducer';

import admin from './admin/adminReducer';
import list from './admin/listReducer';
import remove from './admin/removeReducer';
import profile from './admin/profileReducer';
import updateProfile from './admin/updateReducer';

import details from './common/detailsReducer';
import update from './common/updateReducer';

const rootReducer = combineReducers({
    register,
    login,
    forgot,
    admin,
    list,
    details,
    update,
    remove,
    profile,
    updateProfile,
});

export default rootReducer;
