import { Request, Response } from 'express';

import { translate }  from './translate';
import HttpError from '../errors/HttpError';


export function returnError(error: HttpError, res: Response, req: Request): void {
    if (error.status) {
        res.status(error.status).send(error.message);
    }
    else {
        console.error(error);
        res.status(500).send(translate(req.lang, 'anErrorOccurred'));
    }
}
