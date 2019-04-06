import { Application } from 'express';
import * as config from 'config';

const routes: object = config.get('proxies');


export default (express: any, app: Application): Application => {
    for (const routePath of Object.keys(routes)) {
        const router: any = routes[routePath];

        if (typeof router === 'object') {
            if (router.excludeEnv && router.excludeEnv.indexOf(app.get('env')) === -1) {
                app.use(routePath, express.static(router.router));
            }
        }
        else {
            app.use(routePath, express.static(router));
        }
    }

    return app;
};
