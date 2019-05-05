import  { Router, Request, Response } from 'express';

import { translate } from '../../lib/translate';
import track from '../../lib/matomo';
import { returnError } from '../../lib/apiErrorHandling';

import Controller from '../../interfaces/Controller';
import HttpError from '../../errors/HttpError';


class ExampleApiController implements Controller {
    public router: Router;

    public constructor(router: Router) {
        this.router = router;
        this.initilizeRoutes();
    }

    private initilizeRoutes(): void {
        this.router.get('/', this.getIndex);
    }

    private getIndex(req: Request, res: Response): void {
        const lang: string = req.lang;
        track(req, 'Example API');

        const random: number = Math.floor(Math.random() * Math.floor(2));

        // If random === 0, throw an error just for demonstration purposes
        if (random === 0) {
            const error: HttpError = {
                name: 'Teapot Problem',
                status: 418,
                message: 'I am a teapot'
            };

            return returnError(error, req, res);
        }

        res.json({
            message: translate(lang, 'success')
        });
    }
}

export default (router: Router): void => {
    new ExampleApiController(router);
};
