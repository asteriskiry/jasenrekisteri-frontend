import * as types from './';

export const saveMemberAction = member => {
    return {
        type: types.ADD_MEMBER,
        member,
    };
};

export const memberListAction = data => {
    return {
        type: types.FETCH_MEMBERS,
        data,
    };
};

export const memberRemoveAction = id => {
    return {
        type: types.REMOVE_MEMBER,
        id,
    };
};

export const adminProfileAction = data => {
    return {
        type: types.FETCH_ADMIN_PROFILE,
        data,
    };
};

export const adminProfileUpdateAction = data => {
    return {
        type: types.UPDATE_ADMIN_PROFILE,
        data,
    };
};
