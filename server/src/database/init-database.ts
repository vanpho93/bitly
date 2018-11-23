import faker from 'faker';
import { Link, uid } from '../refs';

export async function initDatabase() {
    // create some links
    const linkCount = await Link.count({});
    if (linkCount) return;
    for (let i = 0; i < 10; i++) {
        const creatorId = uid(10);
        for (let j = 0; j < 20; j++) {
            const url = faker.internet.url();
            const code = uid(7);
            const clickCount = Math.floor(Math.random() * 1000);
            const title = faker.lorem.sentence(10);
            const linkInput = { url, code, clickCount, title, creatorIds: creatorId };
            const link = new Link(linkInput);
            await link.save();
        }
    }
}
