import { getCookie } from '../../utils/cookies';
import { baseurl } from '../../utils/baseurl';

export const fetchAdminProfileService = request => {
    const memberID = request.data.memberID;
    const FETCH_PROFILE = baseurl( `admin/profile?id=${request.data.id}&access=${request.data.access}&memberID=${memberID}`);

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
