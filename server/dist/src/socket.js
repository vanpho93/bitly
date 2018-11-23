"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const refs_1 = require("./refs");
function onSocketConnect(socket) { }
exports.onSocketConnect = onSocketConnect;
function sendMessage(subject, message) {
    if (process.env.NODE_ENV === 'test')
        return;
    refs_1.io.emit(subject, message);
}
exports.sendMessage = sendMessage;
