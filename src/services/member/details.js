import { getCookie } from '../../utils/cookies';
import { baseurl } from '../../utils/baseurl';

export const fetchMemberDetailsService = request => {
    const memberID = request.details.memberID;

    const FETCH_PROFILE = baseurl(`member/details?memberID=${memberID}`);

    const parameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('jasenrekisteri-token'),
        },
    };

    return fetch(FETCH_PROFILE, parameters)
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
