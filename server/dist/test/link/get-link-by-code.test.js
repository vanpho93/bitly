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
const supertest_1 = __importDefault(require("supertest"));
const assert_1 = require("assert");
const refs_1 = require("../../src/refs");
describe('GET /link/creator', () => {
    let link;
    beforeEach('Create links for test', function () {
        return __awaiter(this, void 0, void 0, function* () {
            link = (yield refs_1.CreateLinkService.create('aaaaaaaaaa', 'http://google.com'));
        });
    });
    it('Can get links by creator id', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(refs_1.app).get(`/${link.code}`);
        assert_1.equal(response.text, 'Found. Redirecting to http://google.com');
    }));
    it('Redirect to homepage if url does not exist', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(refs_1.app).get(`/abcde`);
        assert_1.equal(response.text, 'Found. Redirecting to https://myslink.herokuapp.com');
    }));
});
