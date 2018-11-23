import { RequestService } from '../../services/request.service';
import { ADD_LINK_ERROR, ADD_LINK, START_ADD_LINK, SET_LINKS } from './action-types';

function getMessage(errorCode) {
    console.log('errorCode', errorCode);
    if (errorCode === 'LINK_EXISTED') return 'This link was created by you';
    if (errorCode === 'INVALID_HOST') return 'This link is invalid';
    return 'Unexpected error';
}

export function addLink(url) {
    return async dispatch => {
        dispatch({ type: START_ADD_LINK });
        const link = await RequestService.post('/link', { url })
        .catch(error => {
            alert(getMessage(error.message));
            dispatch({ type: ADD_LINK_ERROR });
        });
        console.log(link);
        if (link) dispatch({ type: ADD_LINK, link });
    }
}

export function getLinks() {
    return async dispatch => {
        const links = await RequestService.get('/link/creator').catch(error => {
            // if (error) console.log('error', error);
            return [];
        });
        dispatch({ type: SET_LINKS, links });
    }
}
