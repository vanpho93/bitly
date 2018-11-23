"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const refs_1 = require("../src/refs");
const refs_2 = require("../src/refs");
before(() => __awaiter(this, void 0, void 0, function* () { return yield refs_2.connectDatabase(); }));
beforeEach(() => __awaiter(this, void 0, void 0, function* () {
    yield refs_1.User.remove({});
    yield refs_1.Link.remove({});
}));
