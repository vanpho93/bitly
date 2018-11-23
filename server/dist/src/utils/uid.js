"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const short_unique_id_1 = __importDefault(require("short-unique-id"));
function uid(length) {
    const uid = new short_unique_id_1.default();
    return uid.randomUUID(length);
}
exports.uid = uid;
