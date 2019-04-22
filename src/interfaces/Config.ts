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
