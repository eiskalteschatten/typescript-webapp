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
        '/js/libs/jquery.min.js': path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js'),
        '/js/libs/jquery.min.map': path.join(__dirname, '../node_modules/jquery/dist/jquery.min.map'),
        '/js/libs/bootstrap.min.js': path.join(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.min.js'),
        '/js/libs/bootstrap.min.js.map': path.join(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.min.js.map')
    },
    tracking: {
        matomo: {
            url: 'https://url-to-matomo/matomo.php',
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
    redirects: {
        '/old-url': '/new-url'
    },
    folders: {
        srcFolder: path.resolve(__dirname, '../src')
    }
};
