import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './action-types';

export function addNotification(notification) {
    return { type: ADD_NOTIFICATION, notification };
}

export function removeNotification(code) {
    return { type: REMOVE_NOTIFICATION, code };
}
