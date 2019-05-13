import { getCookie } from '../../utils/cookies';
import { baseurl } from '../../utils/baseurl';

export const removeService = request => {
    const REMOVE_ENDPOINT = baseurl('admin/remove');

    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('jasenrekisteri-token'),
        },
        body: JSON.stringify(request.id),
    };

    return fetch(REMOVE_ENDPOINT, parameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => {
            return { error: error };
        });
};
