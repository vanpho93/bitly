import request from 'supertest';
import { deepEqual, equal, } from 'assert';
import { app, CreateLinkService, User, Link } from '../../src/refs';

const { LINK_EXISTED, INVALID_HOST, INVALID_CREATOR_ID, INVALID_URL } = CreateLinkService.errors;

describe('POST /link', () => {
    it('Can create new link', async () => {
        const response = await request(app)
            .post('/link')
            .send({ url: 'http://google.com' })
            .set({ creator: 'abcdefghik' });
        const expectedBody = {
            success: true,
            result:
            {
                __v: 0,
                url: 'http://google.com',
                code: response.body.result.code,
                title: 'Google',
                _id: response.body.result._id,
                lastClick: response.body.result.lastClick,
                creatorIds: ['abcdefghik'],
                clickCount: 0,
                createAt: response.body.result.createAt
            }
        };
        deepEqual(expectedBody, response.body);
        const linkDb = await Link.findOne({}) as Link;
        equal(linkDb.title, 'Google');
    });

    it('Cannot create link without creatorId', async () => {
        const response = await request(app)
        .post('/link')
        .send({ url: 'http://google.com' })
        .set({ creator: '' });
        deepEqual(response.body, { success: false, message: INVALID_CREATOR_ID });
    });

    it('Cannot create link with invalid creatorId', async () => {
        const response = await request(app)
        .post('/link')
        .send({ url: 'http://google.com' })
        .set({ creator: 'aaa' });
        deepEqual(response.body, { success: false, message: INVALID_CREATOR_ID });
    });

    it('Cannot create link with invalid url', async () => {
        const response = await request(app)
        .post('/link')
        .send({ url: 'google' })
        .set({ creator: 'abcdefghik' });
        deepEqual(response.body, { success: false, message: INVALID_URL });
    });

    it('Cannot create link with invalid host', async () => {
        const response = await request(app)
        .post('/link')
        .send({ url: 'https://facebookaaaaaaaaaaa.com/' })
        .set({ creator: 'abcdefghik' });
        deepEqual(response.body, { success: false, message: INVALID_HOST });
    });

    it('One user cannot create duplicated links', async () => {
        await request(app)
        .post('/link')
        .send({ url: 'http://google.com' })
        .set({ creator: 'abcdefghik' });
        const response = await request(app)
            .post('/link')
            .send({ url: 'http://google.com' })
            .set({ creator: 'abcdefghik' });
        deepEqual(response.body, { success: false, message: LINK_EXISTED });
    });

    it('Dont create new link for existed url', async () => {
        await request(app)
        .post('/link')
        .send({ url: 'http://google.com' })
        .set({ creator: 'aaaaaaaaaa' });
        const response = await request(app)
            .post('/link')
            .send({ url: 'http://google.com' })
            .set({ creator: 'bbbbbbbbbb' });
        equal(response.body.success, true);
        const linkCount = await Link.count({});
        equal(linkCount, 1);
    });
});
