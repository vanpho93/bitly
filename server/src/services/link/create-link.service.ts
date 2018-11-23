import { Link, makeSure, uid, ServerError, sendMessage, mustMatchReg } from '../../refs';
import { get } from 'request';

export class CreateLinkService {
    static errors = {
        LINK_EXISTED: 'LINK_EXISTED',
        INVALID_HOST: 'INVALID_HOST',
        INVALID_CREATOR_ID: 'INVALID_CREATOR_ID',
        INVALID_URL: 'INVALID_URL'
    };

    static async validate(creatorId: string, url: string) {
        // validate createId
        makeSure(creatorId && creatorId.length === 10, this.errors.INVALID_CREATOR_ID);
        // validate url by request
        const urlRegex = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})');
        mustMatchReg(url, urlRegex, this.errors.INVALID_URL);
        // check if existed
        const linkCount = await Link.count({ url, creatorIds: creatorId });
        makeSure(linkCount === 0, this.errors.LINK_EXISTED);
    }

    static async create(creatorId: string, url: string) {
        await this.validate(creatorId, url);
        const linkCount = await Link.count({ url });
        if (linkCount !== 0) {
            const updateObject = { $addToSet: { creatorIds: creatorId } };
            const options = { new: true, select: '-creatorIds' };
            const link = await Link.findOneAndUpdate({ url }, updateObject, options);
            return link;
        }
        const code = uid(7);
        const clickCount = 0;
        const title = await this.getTitle(url);
        const link = new Link({ url, creatorIds: [creatorId], code, clickCount, title });
        await link.save();
        sendMessage('NEW_LINK_CREATED', link);
        return link;
    }

    static async getTitle(url: string) {
        if (process.env.TEST_GET_LINK) return url;
        return new Promise((resolve, reject) => {
            get(url, (error, response, body) => {
                if (error) return reject(new ServerError(this.errors.INVALID_HOST));
                const title = body.match(/<title[^>]*>([^<]+)<\/title>/);
                resolve(title && title[1] ? title[1] : url);
            });
        });
    }
}
