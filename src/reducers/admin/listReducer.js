import * as types from '../../actions/';

export default function(state = [], action) {
    const response = action.response;

    switch (action.type) {
        case types.FETCH_MEMBERS_SUCCESS:
            return { ...state, response };
        default:
            return state;
    }
}
