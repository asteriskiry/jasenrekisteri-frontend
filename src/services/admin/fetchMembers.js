import { getCookie } from '../../utils/cookies';
import { baseurl } from '../../utils/baseurl';

export const fetchMembersService = (request) => {
    let id = request.data.id;
    let access = request.data.access;

    const FETCH_MEMBERS = baseurl(`admin/list?id=${id}&access=${access}`);

    const parameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie('jasenrekisteri-token')
        }
    };

    return fetch(FETCH_MEMBERS, parameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        }).catch(error => {
            return error;
        });
};
