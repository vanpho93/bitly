"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refs_1 = require("../refs");
exports.linkRouter = express_1.Router();
exports.linkRouter.get('/creator', (req, res) => {
    refs_1.GetLinksByCreatorService.get(req.headers.creator)
        .then(links => res.send({ success: true, result: links }))
        .catch(res.onError);
});
exports.linkRouter.get('/:code', (req, res) => {
    refs_1.GetLinksByCode.get(req.params.code)
        .then(link => res.send({ success: true, result: link }))
        .catch(res.onError);
});
exports.linkRouter.post('/', (req, res) => {
    refs_1.CreateLinkService.create(req.headers.creator, req.body.url)
        .then(link => res.send({ success: true, result: link }))
        .catch(res.onError);
});
