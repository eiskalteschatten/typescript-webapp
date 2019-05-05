const env: string = process.env.NODE_ENV;

import { Request } from 'express';
import * as matomoTracker from 'matomo-tracker';
import * as config from 'config';

import { MatomoInterface } from '../interfaces/Config';
const matomoConfig: MatomoInterface = config.get('tracking.matomo');

let matomo: any;


if (env !== 'development') {
    matomo = new matomoTracker(matomoConfig.siteId, matomoConfig.url);

    matomo.on('error', (error: Error): void => {
        console.error('Error tracking request:', error);
    });
}

export default (req: Request, pageTitle: string): void => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;

    if (env !== 'production') {
        console.log('Tracked:', pageTitle, '-', url);
    }

    if (env !== 'development') {
        matomo.track({
            url: url,
            'action_name': pageTitle
        });
    }
};
