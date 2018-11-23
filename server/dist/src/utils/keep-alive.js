"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const refs_1 = require("../refs");
if (refs_1.SHOULD_KEEP_ALIVE) {
    setInterval(() => request_1.default.get(refs_1.SERVER_URL), 3 * 60000);
}
