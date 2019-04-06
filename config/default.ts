import * as path from 'path';

export interface CssConfigInterface {
    sassFilesToCompile: string[];
}

export interface LocalesInterface {
    defaultLanguage: string;
    availableLanguages: string[];
}

export interface MatomoInterface {
    url: string;
    siteId: number;
}

export default {
    proxies: {
        '/js/libs/jquery.min.js': path.join(__dirname, '../../node_modules/jquery/dist/jquery.min.js'),
        '/js/libs/jquery.min.map': path.join(__dirname, '../../node_modules/jquery/dist/jquery.min.map')
    },
    tracking: {
        matomo: {
            url: 'https://url-to-matomo',
            siteId: 1
        }
    },
    locals: {},
    locales: {
        defaultLanguage: 'en',
        availableLanguages: ['en', 'de']
    },
    css: {
        sassFilesToCompile: [
            'libs.scss',
            'main.scss'
        ]
    },
    folders: {
        publicDistFolder: path.resolve(__dirname, '../src/public'),
        srcFolder: path.resolve(__dirname, '../src')
    }
};
