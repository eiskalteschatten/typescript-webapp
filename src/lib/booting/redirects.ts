import { Request, Response, NextFunction } from 'express';
import * as config from 'config';

import { parseRoute } from '../helper';

const redirects = config.get('redirects');

export default (req: Request, res: Response, next: NextFunction): void => {
    const originalUrl: string = '/' + parseRoute(req.originalUrl);
    const newUrl: string = redirects[originalUrl];

    if (newUrl) {
        const redirectUrl: string = '/' + req.lang + newUrl;
        res.redirect(301, redirectUrl);
        return;
    }

    next();
};
