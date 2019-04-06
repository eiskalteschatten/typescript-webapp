import { Request, Response, Application, NextFunction } from 'express';
import * as nunjucks from 'nunjucks';
import * as nunjucksMarkdown from 'nunjucks-markdown';
import * as marked from 'marked';
import * as path from 'path';

import * as helper from '../helper';
import * as transLib from '../translate';


export default (app: Application): void => {
    // View engine setup
    app.set('view engine', 'html');

    const nunjucksEnv: nunjucks.Environment = nunjucks.configure(path.join(__dirname, '../../views'), {
        autoescape: true,
        express: app
    });


    // Custom filters in Nunjucks
    nunjucksEnv.addFilter('translate', (str: string, lang: string): string => {
        return transLib.translate(lang, str);
    });

    nunjucksEnv.addFilter('langUrl', (route: string, lang: string): string => {
        return transLib.getLocalizedUrl(lang, route);
    });

    nunjucksEnv.addFilter('formatDate', (date: Date, lang: string): string => {
        return transLib.getLocalizedDate(date, lang);
    });


    // Globals
    nunjucksEnv.addGlobal('getAllLanguageUrls', (req: Request): object => {
        return transLib.getAllLanguageUrls(req);
    });

    nunjucksEnv.addGlobal('getCurrentYear', (): number => {
        return new Date().getFullYear();
    });

    nunjucksEnv.addGlobal('appLocales', app.locals.locales);


    // Setup Nunjucks Markdown
    nunjucksMarkdown.register(nunjucksEnv, marked);


    // Set the app's engine to Nunjucks
    app.set('engine', nunjucksEnv);

    // Add the Express request globally to Nunjucks
    app.use((req: Request, res: Response, next: NextFunction): void => {
        const engine: any = res.app.get('engine');
        const route: string = helper.parseRoute(req.originalUrl);

        engine.addGlobal('req', req);
        engine.addGlobal('plainRoute', route);
        engine.addGlobal('baseUrl', req.protocol + '://' + req.get('host'));

        next();
    });
};
