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
const refs_1 = require("../../refs");
const request_1 = require("request");
class CreateLinkService {
    static validate(creatorId, url) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate createId
            refs_1.makeSure(creatorId && creatorId.length === 10, this.errors.INVALID_CREATOR_ID);
            // validate url by request
            const urlRegex = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})');
            refs_1.mustMatchReg(url, urlRegex, this.errors.INVALID_URL);
            // check if existed
            const linkCount = yield refs_1.Link.count({ url, creatorIds: creatorId });
            refs_1.makeSure(linkCount === 0, this.errors.LINK_EXISTED);
        });
    }
    static create(creatorId, url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validate(creatorId, url);
            const linkCount = yield refs_1.Link.count({ url });
            if (linkCount !== 0) {
                const updateObject = { $addToSet: { creatorIds: creatorId } };
                const options = { new: true, select: '-creatorIds' };
                const link = yield refs_1.Link.findOneAndUpdate({ url }, updateObject, options);
                return link;
            }
            const code = refs_1.uid(7);
            const clickCount = 0;
            const title = yield this.getTitle(url);
            const link = new refs_1.Link({ url, creatorIds: [creatorId], code, clickCount, title });
            yield link.save();
            refs_1.sendMessage('NEW_LINK_CREATED', link);
            return link;
        });
    }
    static getTitle(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.TEST_GET_LINK)
                return url;
            return new Promise((resolve, reject) => {
                request_1.get(url, (error, response, body) => {
                    if (error)
                        return reject(new refs_1.ServerError(this.errors.INVALID_HOST));
                    const title = body.match(/<title[^>]*>([^<]+)<\/title>/);
                    resolve(title && title[1] ? title[1] : url);
                });
            });
        });
    }
}
CreateLinkService.errors = {
    LINK_EXISTED: 'LINK_EXISTED',
    INVALID_HOST: 'INVALID_HOST',
    INVALID_CREATOR_ID: 'INVALID_CREATOR_ID',
    INVALID_URL: 'INVALID_URL'
};
exports.CreateLinkService = CreateLinkService;
