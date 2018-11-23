import request from 'supertest';
import { deepEqual, equal, } from 'assert';
import { app, CreateLinkService } from '../../src/refs';

describe('GET /link/creator', () => {
    beforeEach('Create links for test', async function () {
        process.env.TEST_GET_LINK = 'true';
        await CreateLinkService.create('aaaaaaaaaa', 'http://google.com');
        await CreateLinkService.create('aaaaaaaaaa', 'http://facebook.com');
        await CreateLinkService.create('aaaaaaaaaa', 'http://yahoo.com');
        await CreateLinkService.create('bbbbbbbbbb', 'http://football.com');
        await CreateLinkService.create('bbbbbbbbbb', 'http://nodejs.org');
        await CreateLinkService.create('bbbbbbbbbb', 'http://react.org');
    });

    it('Can get links by creator id', async () => {
        const response = await request(app).get('/link/creator').set({ creator: 'aaaaaaaaaa' });
        equal(response.body.result.length, 3);
    });

    it('Cannot get link with invalid creator id', async () => {
        const response = await request(app).get('/link/creator').set({ creator: 'a' });
        deepEqual(response.body, { success: false, message: 'INVALID_CREATOR_ID' });
    });

    after('Remove TEST_GET_LINK', () => delete process.env.TEST_GET_LINK);
});
