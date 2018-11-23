import axios from 'axios';
import { CookieService } from '../services/cookie.service';
import { SERVER_URL } from '../config';

export class RequestService {
    static getConfig() {
        const creator = CookieService.getCookie('creatorId');
        const clientConfig = { headers: { creator } };
        return clientConfig;
    }

    static get(subUrl) {
        return axios.get(`${SERVER_URL}${subUrl}`, RequestService.getConfig())
        .then(res => res.data.result)
        .catch(error => { throw new Error(error.response.data.message); })
    }

    static post(subUrl, data = {}) {
        const config = RequestService.getConfig();
        console.log(config);
        return axios.post(`${SERVER_URL}${subUrl}`, data, config)
        .then(res => res.data.result)
        .catch(error => { throw new Error(error.response.data.message); })
    }
}
