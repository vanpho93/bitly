import { Link } from '../../refs';

export class GetLinksByCode {
    static errors = {
        INVALID_LINK_CODE: 'INVALID_LINK_CODE'
    };

    static async get(code: string): Promise<Link> {
        const updateObject = { $inc: { clickCount: 1 }, lastClick: Date.now() };
        const link = await Link.findOneAndUpdate({ code }, updateObject)
        .select({ creatorIds: false, __v: false, _id: false }) as Link;
        return link;
    }
}
