import { Link, makeSure } from '../../refs';

export class GetLinksByCreatorService {
    static errors = {
        INVALID_CREATOR_ID: 'INVALID_CREATOR_ID'
    };

    static async validate(creatorId: string) {
        makeSure(creatorId.length === 10, this.errors.INVALID_CREATOR_ID);
    }

    static async get(createId: string) {
        await this.validate(createId);
        const links = await Link.find({ creatorIds: createId })
            .sort('clickCount')
            .select({ creatorIds: false, __v: false, _id: false })
            .limit(10);
        return links;
    }
}
