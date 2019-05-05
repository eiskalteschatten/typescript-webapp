import { Request, Response, NextFunction } from 'express';
import * as moment from 'moment';
import * as config from 'config';

import translations from '../translations';
import { parseRoute } from '../lib/helper';

import { LocalesInterface } from '../interfaces/Config';

const locales: LocalesInterface = config.get('locales');


export function translate(lang: string, string: string): string {
    const langStrings = translations[lang];

    const useDefaultLangage = (): string => {
        const defaultStrings: string[] = translations[locales.defaultLanguage];

        if (defaultStrings && defaultStrings[string]) {
            return defaultStrings[string];
        }
    };

    if (langStrings && langStrings[string]) {
        return langStrings[string];
    }
    else {
        return useDefaultLangage();
    }
}

export function getLocalizedUrl(lang: string, route: string): string {
    if (route.charAt(0) !== '/') {
        route = '/' + route;
    }

    return '/' + lang + route;
}

export function redirectToLanguage(req: Request, res: Response, route: string): void {
    let lang: any = req.acceptsLanguages(locales.availableLanguages);

    if (!lang) {
        lang = locales.defaultLanguage;
    }

    res.redirect(getLocalizedUrl(lang, route));
}

export function checkLangUrl(req: Request, res: Response, route: string, next: NextFunction): void {
    const lang: string = req.lang;

    if (locales.availableLanguages.indexOf(lang) === -1) {
        res.sendStatus(404);
    }
    else {
        next();
    }
}

export function getAllLanguageUrls(req: Request): object {
    const lang: string = req.lang;
    const urls: object = {};
    const route: string = parseRoute(req.originalUrl);

    locales.availableLanguages.forEach((locale: string): void => {
        if (locale !== lang) {
            urls[locale] = getLocalizedUrl(locale, route);
        }
    });

    return urls;
}

export function getLocalizedDate(date: Date, lang: string): string {
    return moment(date).locale(lang).format('LLL');
}
