import { getCookie } from '../../utils/cookies';
import { baseurl } from '../../utils/baseurl';

export const updateMemberDetailsService = request => {
    const UPDATE_PROFILE = baseurl('member/details');

    const parameters = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('jasenrekisteri-token'),
        },
        body: JSON.stringify(request.details),
    };

    return fetch(UPDATE_PROFILE, parameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => {
            return error;
        });
};
