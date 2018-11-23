"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const testingConfig = {
    DATABASE_URI: 'mongodb://localhost/bitly-test',
    FRONT_END_URL: 'https://myslink.herokuapp.com',
    SERVER_URL: 'http://localhost:4000',
};
const developmentConfig = {
    DATABASE_URI: 'mongodb://localhost/bitly',
    FRONT_END_URL: 'http://localhost:3000',
    SERVER_URL: 'http://localhost:4000'
};
const staggingConfig = {
    DATABASE_URI: 'mongodb://admin:abc123@ds251632.mlab.com:51632/kpi',
    FRONT_END_URL: 'https://myslink.herokuapp.com',
    SERVER_URL: 'https://api-kpibsc.herokuapp.com',
};
// TODO update production config to run in production mode
// const productionConfig: ServerConfig = {};
function getConfig() {
    if (process.env.NODE_ENV === 'test')
        return testingConfig;
    if (process.env.NODE_ENV === 'production')
        return staggingConfig;
    return developmentConfig;
}
_a = getConfig(), exports.DATABASE_URI = _a.DATABASE_URI, exports.FRONT_END_URL = _a.FRONT_END_URL, exports.SERVER_URL = _a.SERVER_URL, exports.SHOULD_KEEP_ALIVE = _a.SHOULD_KEEP_ALIVE;
