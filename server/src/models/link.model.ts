import { Schema, model } from 'mongoose';

const linkSchema = new Schema({
    url: { type: String, required: true, index: true, unique: true },
    code: { type: String, required: true, index: true },
    createAt: { type: Number, default: Date.now },
    clickCount: { type: Number, default: 0 },
    title: { type: String },
    creatorIds: [{ type: String, index: true }],
    lastClick: { type: Number, default: Date.now }
});

const LinkModel = model('Link', linkSchema);

export class Link extends LinkModel {
    url: string;
    code: string;
    createAt: number;
    clickCount: number;
    title: string;
    creatorIds: string[];
}
