import axios from 'axios';
import config from '../config';
import { normalizeResponse } from './responses';

const api = axios.create({
    baseURL: config.apiUrl,
    responseType: 'json',
    withCredentials: true,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

api.interceptors.response.use((response) => {
    response.data = normalizeResponse(response.data);
    return response;
});

export default api;
