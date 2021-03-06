import { Request, Response, NextFunction } from 'express';
import * as config from 'config';

import { parseRoute } from '../helper';

const redirects: any = config.get('redirects');

export default (req: Request, res: Response, next: NextFunction): void => {
    const originalUrl: string = '/' + parseRoute(req.originalUrl.replace(/\/$/, ''));
    const regexString = `^${originalUrl}/?$`;
    const regex = new RegExp(regexString, 'g');

    for (const redirectedUrl in redirects) {
        if (regex.test(redirectedUrl)) {
            const redirectUrl: string = '/' + req.lang + redirects[redirectedUrl];
            res.redirect(301, redirectUrl);
            return;
        }
    }

    next();
};
