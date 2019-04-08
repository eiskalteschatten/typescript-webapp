import * as express from 'express';
import * as enrouten from 'express-enrouten';
import * as config from 'config';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import configureProxies from './lib/booting/proxies';
import configureRedirects from './lib/booting/redirects';
import { redirectToLanguage } from './lib/translate';
import configureNunjucks from './lib/booting/nunjucks';
import configureSass from './lib/booting/compileSass';
import configureErrorPages from './lib/booting/errorPages';

class App {
    public app: express.Application;

    public constructor() {
        this.app = express();
        this.app.locals = {
            ...this.app.locals,
            ...config.get('locals'),
            locales: config.get('locales')
        };
    }

    public async setupApp(): Promise<express.Application> {
        this.configureExpress();
        configureNunjucks(this.app);
        await configureSass(this.app);
        await this.configureRoutes();
        configureErrorPages(this.app);

        console.log('App started with:');
        console.log('- Node.js', process.version);
        console.log(`- Started with NODE_ENV=${process.env.NODE_ENV}`);

        return this.app;
    }

    private configureExpress(): void {
        this.app.use(compression());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.disable('x-powered-by');
    }

    private async configureRoutes(): Promise<void> {
        configureProxies(express, this.app);

        const publicFolder: string = config.get('folders.publicDistFolder');
        this.app.use(express.static(publicFolder));

        const langRoute = '/:lang';

        this.app.get('/', (req: express.Request, res: express.Response): void => {
            redirectToLanguage(req, res, '/');
        });

        this.app.use(langRoute, (req: express.Request, res: express.Response, next: express.NextFunction): void => {
            req.lang = req.params.lang;
            next();
        });

        this.app.use('*', configureRedirects);

        this.app.use(langRoute, enrouten({
            directory: 'controllers'
        }));
    }
}

export default new App();
