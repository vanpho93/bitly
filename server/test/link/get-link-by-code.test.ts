import request from 'supertest';
import { deepEqual, equal, } from 'assert';
import { app, CreateLinkService, Link } from '../../src/refs';

describe('GET /link/creator', () => {
    let link: Link;
    beforeEach('Create links for test', async function () {
        link = await CreateLinkService.create('aaaaaaaaaa', 'http://google.com') as Link;
    });

    it('Can get links by creator id', async () => {
        const response = await request(app).get(`/${link.code}`);
        equal(response.text, 'Found. Redirecting to http://google.com');
    });

    it('Redirect to homepage if url does not exist', async () => {
        const response = await request(app).get(`/abcde`);
        equal(response.text, 'Found. Redirecting to https://myslink.herokuapp.com');
    });
});
