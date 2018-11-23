import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, index: true, lowercase: true, sparse: true },
    password: { type: String, required: true },
});

const UserModel = model('User', userSchema);

export class User extends UserModel {
    name: string;
    email: string;
    password: string;
    token?: string;
}
