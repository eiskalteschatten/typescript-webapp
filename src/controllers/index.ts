import  { Router, Request, Response } from 'express';

import { translate } from '../lib/translate';
import track from '../lib/matomo';

import Controller from '../interfaces/Controller';


class IndexController implements Controller {
    public router: Router;

    constructor(router: Router) {
        this.router = router;
        this.initilizeRoutes();
    }

    private initilizeRoutes(): void {
        this.router.get('/', this.getIndex);
    }

    private getIndex(req: Request, res: Response): void {
        const lang: string = req.lang;
        const pageTitle: string = translate(lang, 'homepageTitle');

        track(req, pageTitle);

        res.render('home/index.njk', {
            title: pageTitle,
            items: [
                { name : translate(lang, 'homepageTitle') },
                { name : lang },
                { name : 'item #3' },
                { name : 'item #4' }
            ]
        });
    }
}

export default (router: Router) => {
    const controller = new IndexController(router);
};
