import * as types from '../../actions/';

export default function(state = [], action) {
    const response = action.response;

    switch (action.type) {
        case types.FETCH_ADMIN_PROFILE_SUCCESS:
            return { ...state, action };
        default:
            return state;
    }
}
