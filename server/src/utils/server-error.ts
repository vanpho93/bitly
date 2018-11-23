export class ServerError extends Error {
    statusCode: number;
    constructor(msg: string, statusCode = 400) {
        super(msg);
        if (statusCode) this.statusCode = statusCode;
    }
}
