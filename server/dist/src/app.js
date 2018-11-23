"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
const socket_io_1 = __importDefault(require("socket.io"));
const refs_1 = require("./refs");
exports.app = express_1.default();
exports.app.use(cors_1.default());
exports.app.use(body_parser_1.json());
exports.app.use(cookie_parser_1.default());
exports.app.use(refs_1.onError);
if (!process.env.NODE_ENV)
    exports.app.use((req, res, next) => setTimeout(next, 500));
exports.app.get('/', (req, res) => res.send({ success: true }));
exports.app.use('/link', refs_1.linkRouter);
exports.app.get('/:code', (req, res) => {
    refs_1.GetLinksByCode.get(req.params.code)
        .then(link => res.redirect(link.url))
        .catch(() => res.redirect(refs_1.FRONT_END_URL));
});
exports.app.use((req, res) => res.status(404).send({ success: false, message: 'INVALID_ROUTE' }));
exports.app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send({ success: false, message: 'INTERNAL_SERVER_ERROR' });
});
exports.server = http_1.createServer(exports.app);
exports.io = socket_io_1.default(exports.server);
exports.io.on('connection', refs_1.onSocketConnect);
