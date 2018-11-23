import request from 'request';
import { SERVER_URL, SHOULD_KEEP_ALIVE } from '../refs';

if (SHOULD_KEEP_ALIVE) {
    setInterval(() => request.get(SERVER_URL), 3 * 60000);
}
