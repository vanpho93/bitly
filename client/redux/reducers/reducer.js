import { combineReducers } from 'redux';
import { SET_LINKS, ADD_LINK, ADD_LINK_ERROR, REMOVE_NOTIFICATION } from '../actions/action-types';
import { START_ADD_LINK, ADD_NOTIFICATION } from '../actions/action-types';

const linksReducer = (state = [], action) => {
    if (action.type === SET_LINKS) return action.links;
    if (action.type === ADD_LINK) return [action.link, ...state];
    return state;
}

const notificationsReducer = (state = [], action) => {
    if (action.type === ADD_NOTIFICATION) return [action.notification, ...state];
    if (action.type === REMOVE_NOTIFICATION) return state.filter(n => n.code !== action.code)
    return state;
};

const loadingReducer = (state = false, action) => {
    if (action.type === START_ADD_LINK) return true;
    if (action.type === ADD_LINK) return false;
    if (action.type === ADD_LINK_ERROR) return false;
    return state;
};

export const reducer = combineReducers({
    links: linksReducer,
    notifications: notificationsReducer,
    loading: loadingReducer
});
