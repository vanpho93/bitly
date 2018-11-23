import { Router } from 'express';
import { CreateLinkService, GetLinksByCode, GetLinksByCreatorService } from '../refs';

export const linkRouter = Router();

linkRouter.get('/creator', (req, res: any) => {
    GetLinksByCreatorService.get(req.headers.creator as string)
        .then(links => res.send({ success: true, result: links }))
        .catch(res.onError);
});

linkRouter.get('/:code', (req, res: any) => {
    GetLinksByCode.get(req.params.code)
        .then(link => res.send({ success: true, result: link }))
        .catch(res.onError);
});

linkRouter.post('/', (req, res: any) => {
    CreateLinkService.create(req.headers.creator as string, req.body.url)
    .then(link => res.send({ success: true, result: link }))
        .catch(res.onError);
});
