import { call, put } from 'redux-saga/effects';
import { fetchMemberDetailsService } from '../../services/member/details';

import * as types from '../../actions';

export function* fetchMemberDetails(payload) {
    try {
        const response = yield call(fetchMemberDetailsService, payload);
        yield [put({ type: types.FETCH_MEMBER_DETAILS_SUCCESS, response })];
    } catch (error) {
        yield put({ type: types.FETCH_MEMBER_DETAILS_SUCCESS, error });
    }
}
