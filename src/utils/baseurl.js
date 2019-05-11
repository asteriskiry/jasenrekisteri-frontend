export function baseurl(endpoint) {
    const local = 'http://localhost:3001/api/';
    const remote = '';

    return `${local}${endpoint}`;
}
