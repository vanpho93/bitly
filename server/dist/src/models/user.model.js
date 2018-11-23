"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, index: true, lowercase: true, sparse: true },
    password: { type: String, required: true },
});
const UserModel = mongoose_1.model('User', userSchema);
class User extends UserModel {
}
exports.User = User;
