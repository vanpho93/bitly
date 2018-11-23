import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import ioFactory from 'socket.io';
import { onError, linkRouter, onSocketConnect, GetLinksByCode, FRONT_END_URL } from './refs';

export const app = express();

app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(onError);

if (!process.env.NODE_ENV) app.use((req, res, next) => setTimeout(next, 500));

app.get('/', (req, res) => res.send({ success: true }));
app.use('/link', linkRouter);
app.get('/:code', (req, res) => {
    GetLinksByCode.get(req.params.code)
    .then(link => res.redirect(link.url))
    .catch(() => res.redirect(FRONT_END_URL));
})

app.use((req, res) => res.status(404).send({ success: false, message: 'INVALID_ROUTE' }));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error.stack)
    res.status(500).send({ success: false, message: 'INTERNAL_SERVER_ERROR' });
});

export const server = createServer(app);
export const io = ioFactory(server);
io.on('connection', onSocketConnect);
