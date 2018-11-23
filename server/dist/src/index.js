"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const refs_1 = require("./refs");
require("./utils/keep-alive");
refs_1.connectDatabase();
// initDatabase();
const port = process.env.PORT || 4000;
refs_1.server.listen(port, () => console.log('SERVER STARTED SUCCESSFULLY!'));
refs_1.clearUnusedLinks();
