"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const linkSchema = new mongoose_1.Schema({
    url: { type: String, required: true, index: true, unique: true },
    code: { type: String, required: true, index: true },
    createAt: { type: Number, default: Date.now },
    clickCount: { type: Number, default: 0 },
    title: { type: String },
    creatorIds: [{ type: String, index: true }],
    lastClick: { type: Number, default: Date.now }
});
const LinkModel = mongoose_1.model('Link', linkSchema);
class Link extends LinkModel {
}
exports.Link = Link;
