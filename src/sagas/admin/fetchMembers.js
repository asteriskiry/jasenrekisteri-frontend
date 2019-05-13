import { call, put } from 'redux-saga/effects';
import { fetchMembersService } from '../../services/admin/fetchMembers';

import * as types from '../../actions';

export function* fetchMembers(payload) {
    try {
        const response = yield call(fetchMembersService, payload);
        yield [put({ type: types.FETCH_MEMBERS_SUCCESS, response })];
    } catch (error) {
        yield put({ type: types.FETCH_MEMBERS_SUCCESS, error });
    }
}
