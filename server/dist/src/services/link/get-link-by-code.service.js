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
class GetLinksByCode {
    static get(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateObject = { $inc: { clickCount: 1 }, lastClick: Date.now() };
            const link = yield refs_1.Link.findOneAndUpdate({ code }, updateObject)
                .select({ creatorIds: false, __v: false, _id: false });
            return link;
        });
    }
}
GetLinksByCode.errors = {
    INVALID_LINK_CODE: 'INVALID_LINK_CODE'
};
exports.GetLinksByCode = GetLinksByCode;
