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
class GetLinksByCreatorService {
    static validate(creatorId) {
        return __awaiter(this, void 0, void 0, function* () {
            refs_1.makeSure(creatorId.length === 10, this.errors.INVALID_CREATOR_ID);
        });
    }
    static get(createId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validate(createId);
            const links = yield refs_1.Link.find({ creatorIds: createId })
                .sort('clickCount')
                .select({ creatorIds: false, __v: false, _id: false })
                .limit(10);
            return links;
        });
    }
}
GetLinksByCreatorService.errors = {
    INVALID_CREATOR_ID: 'INVALID_CREATOR_ID'
};
exports.GetLinksByCreatorService = GetLinksByCreatorService;
