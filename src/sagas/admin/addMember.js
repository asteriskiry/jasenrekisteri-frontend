import { call, put } from 'redux-saga/effects';
import { addMemberService } from '../../services/admin/addMember';

import * as types from '../../actions';

export function* addMemberSaga(payload) {
    try {
        const response = yield call(addMemberService, payload.member);
        yield [put({ type: types.ADD_MEMBER_SUCCESS, response })];
    } catch (error) {
        yield put({ type: types.ADD_MEMBER_SUCCESS, error });
    }
}
