"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ONE_DAY = 86400000;
function clearUnusedLinks() {
    clear();
    setInterval(clear, ONE_DAY / 4);
}
exports.clearUnusedLinks = clearUnusedLinks;
function clear() {
    return __awaiter(this, void 0, void 0, function* () {
        const Link = mongoose_1.default.model('Link');
        const acceptableLastClick = Date.now() - 7 * ONE_DAY;
        const response = yield Link.deleteMany({ lastClick: { $lte: acceptableLastClick } });
        console.log(`New scan, removed ${response.result.n} unused links`);
    });
}
