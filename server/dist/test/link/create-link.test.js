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
const { LINK_EXISTED, INVALID_HOST, INVALID_CREATOR_ID, INVALID_URL } = refs_1.CreateLinkService.errors;
describe('POST /link', () => {
    it('Can create new link', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(refs_1.app)
            .post('/link')
            .send({ url: 'http://google.com' })
            .set({ creator: 'abcdefghik' });
        const expectedBody = {
            success: true,
            result: {
                __v: 0,
                url: 'http://google.com',
                code: response.body.result.code,
                title: 'Google',
                _id: response.body.result._id,
                lastClick: response.body.result.lastClick,
                creatorIds: ['abcdefghik'],
                clickCount: 0,
                createAt: response.body.result.createAt
            }
        };
        assert_1.deepEqual(expectedBody, response.body);
        const linkDb = yield refs_1.Link.findOne({});
        assert_1.equal(linkDb.title, 'Google');
    }));
    it('Cannot create link without creatorId', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(refs_1.app)
            .post('/link')
            .send({ url: 'http://google.com' })
            .set({ creator: '' });
        assert_1.deepEqual(response.body, { success: false, message: INVALID_CREATOR_ID });
    }));
    it('Cannot create link with invalid creatorId', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(refs_1.app)
            .post('/link')
            .send({ url: 'http://google.com' })
            .set({ creator: 'aaa' });
        assert_1.deepEqual(response.body, { success: false, message: INVALID_CREATOR_ID });
    }));
    it('Cannot create link with invalid url', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(refs_1.app)
            .post('/link')
            .send({ url: 'google' })
            .set({ creator: 'abcdefghik' });
        assert_1.deepEqual(response.body, { success: false, message: INVALID_URL });
    }));
    it('Cannot create link with invalid host', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(refs_1.app)
            .post('/link')
            .send({ url: 'https://facebookaaaaaaaaaaa.com/' })
            .set({ creator: 'abcdefghik' });
        assert_1.deepEqual(response.body, { success: false, message: INVALID_HOST });
    }));
    it('One user cannot create duplicated links', () => __awaiter(this, void 0, void 0, function* () {
        yield supertest_1.default(refs_1.app)
            .post('/link')
            .send({ url: 'http://google.com' })
            .set({ creator: 'abcdefghik' });
        const response = yield supertest_1.default(refs_1.app)
            .post('/link')
            .send({ url: 'http://google.com' })
            .set({ creator: 'abcdefghik' });
        assert_1.deepEqual(response.body, { success: false, message: LINK_EXISTED });
    }));
    it('Dont create new link for existed url', () => __awaiter(this, void 0, void 0, function* () {
        yield supertest_1.default(refs_1.app)
            .post('/link')
            .send({ url: 'http://google.com' })
            .set({ creator: 'aaaaaaaaaa' });
        const response = yield supertest_1.default(refs_1.app)
            .post('/link')
            .send({ url: 'http://google.com' })
            .set({ creator: 'bbbbbbbbbb' });
        assert_1.equal(response.body.success, true);
        const linkCount = yield refs_1.Link.count({});
        assert_1.equal(linkCount, 1);
    }));
});
