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
    beforeEach('Create links for test', function () {
        return __awaiter(this, void 0, void 0, function* () {
            process.env.TEST_GET_LINK = 'true';
            yield refs_1.CreateLinkService.create('aaaaaaaaaa', 'http://google.com');
            yield refs_1.CreateLinkService.create('aaaaaaaaaa', 'http://facebook.com');
            yield refs_1.CreateLinkService.create('aaaaaaaaaa', 'http://yahoo.com');
            yield refs_1.CreateLinkService.create('bbbbbbbbbb', 'http://football.com');
            yield refs_1.CreateLinkService.create('bbbbbbbbbb', 'http://nodejs.org');
            yield refs_1.CreateLinkService.create('bbbbbbbbbb', 'http://react.org');
        });
    });
    it('Can get links by creator id', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(refs_1.app).get('/link/creator').set({ creator: 'aaaaaaaaaa' });
        assert_1.equal(response.body.result.length, 3);
    }));
    it('Cannot get link with invalid creator id', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(refs_1.app).get('/link/creator').set({ creator: 'a' });
        assert_1.deepEqual(response.body, { success: false, message: 'INVALID_CREATOR_ID' });
    }));
    after('Remove TEST_GET_LINK', () => delete process.env.TEST_GET_LINK);
});
