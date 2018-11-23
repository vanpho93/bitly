import { Socket } from 'socket.io';
import { io } from './refs';

export function onSocketConnect(socket: Socket) {}

export function sendMessage(subject: string, message: string | object) {
    if (process.env.NODE_ENV === 'test') return;
    io.emit(subject, message);
}
