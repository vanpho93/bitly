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
const faker_1 = __importDefault(require("faker"));
const refs_1 = require("../refs");
function initDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        // create some links
        const linkCount = yield refs_1.Link.count({});
        if (linkCount)
            return;
        for (let i = 0; i < 10; i++) {
            const creatorId = refs_1.uid(10);
            for (let j = 0; j < 20; j++) {
                const url = faker_1.default.internet.url();
                const code = refs_1.uid(7);
                const clickCount = Math.floor(Math.random() * 1000);
                const title = faker_1.default.lorem.sentence(10);
                const linkInput = { url, code, clickCount, title, creatorIds: creatorId };
                const link = new refs_1.Link(linkInput);
                yield link.save();
            }
        }
    });
}
exports.initDatabase = initDatabase;
