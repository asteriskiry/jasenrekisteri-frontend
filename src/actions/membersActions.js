import * as types from './';

export const memberDetailsAction = (details) => {
    return {
        type: types.FETCH_MEMBER_DETAILS,
        details
    }
};

export const memberUpdateAction = (details) => {
    return {
        type: types.UPDATE_MEMBER_DETAILS,
        details
    }
};
