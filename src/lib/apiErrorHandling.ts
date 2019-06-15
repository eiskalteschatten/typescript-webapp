import { Request, Response } from 'express';

import { translate }  from './translate';
import HttpError from '../errors/HttpError';


export function returnError(error: HttpError, req: Request, res: Response): void {
    console.error(error);
    res.status(error.status || 500).send(error.message || translate(req.lang, 'anErrorOccurred'));
}
