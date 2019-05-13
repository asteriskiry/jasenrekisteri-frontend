import { call, put } from 'redux-saga/effects';
import { updateMemberDetailsService } from '../../services/member/update';

import * as types from '../../actions';

export function* updateMemberDetails(payload) {
    try {
        const response = yield call(updateMemberDetailsService, payload);
        yield [put({ type: types.UPDATE_MEMBER_DETAILS_SUCCESS, response })];
    } catch (error) {
        yield put({ type: types.UPDATE_MEMBER_DETAILS_SUCCESS, error });
    }
}
