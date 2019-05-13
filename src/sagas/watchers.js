import { takeLatest } from 'redux-saga/effects';
import {
    registerSaga,
    loginSaga,
    forgotPasswordSaga,
} from './authenticationSaga';

import { addMemberSaga } from './admin/addMember';
import { fetchMembers } from './admin/fetchMembers';
import { remove } from './admin/remove';
import { profile } from './admin/profile';
import { updateProfile } from './admin/updateProfile';

import { fetchMemberDetails } from './member/fetchDetails';
import { updateMemberDetails } from './member/updateDetails';

import * as types from '../actions';

export default function* watchUserAuthentication() {
    yield takeLatest(types.REGISTER_USER, registerSaga);
    yield takeLatest(types.LOGIN_USER, loginSaga);
    yield takeLatest(types.FORGOT_PASSWORD, forgotPasswordSaga);
    yield takeLatest(types.ADD_MEMBER, addMemberSaga);
    yield takeLatest(types.FETCH_MEMBERS, fetchMembers);
    yield takeLatest(types.FETCH_MEMBER_DETAILS, fetchMemberDetails);
    yield takeLatest(types.UPDATE_MEMBER_DETAILS, updateMemberDetails);
    yield takeLatest(types.REMOVE_MEMBER, remove);
    yield takeLatest(types.FETCH_ADMIN_PROFILE, profile);
    yield takeLatest(types.UPDATE_ADMIN_PROFILE, updateProfile);
}
