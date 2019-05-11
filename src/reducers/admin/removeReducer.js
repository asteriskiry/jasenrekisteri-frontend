import * as types from '../../actions/';

export default function(state = [], action) {
    const response = action.response;

    switch(action.type) {
        case types.REMOVE_MEMBER_SUCCESS:
            return { ...state, response };
        default:
            return state;
    }
}
