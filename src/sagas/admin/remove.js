import { call, put } from 'redux-saga/effects';
import { removeService } from '../../services/admin/remove';

import * as types from '../../actions';

export function* remove(payload) {
    try {
        const response = yield call(removeService, payload);
        yield [put({ type: types.REMOVE_MEMBER_SUCCESS, response })];
    } catch (error) {
        yield put({ type: types.REMOVE_MEMBER_SUCCESS, error });
    }
}
