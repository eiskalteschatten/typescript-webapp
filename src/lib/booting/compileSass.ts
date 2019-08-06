import { Application } from 'express';
import * as path from 'path';
import * as config from 'config';

import {
    default as compileSass,
    compileSassAndSaveMultiple,
    setupCleanupOnExit as setupCleanupOnExitCs
} from 'compile-sass';

import { CssConfigInterface } from '../../interfaces/Config';

const cssConfig: CssConfigInterface = config.get('css');
const publicFolder: string = path.resolve(__dirname, '../../public');
const srcFolder: string = config.get('folders.srcFolder');

function setupCleanupOnExit(): void {
    process.on('SIGINT', (): void => {
        try {
            setupCleanupOnExitCs(path.resolve(publicFolder, 'css/'));
            process.exit(0);
        }
        catch(error) {
            process.exit(1);
        }
    });
}

export default (app: Application): Promise<void> => {
    if (app.get('env') === 'staging' || app.get('env') === 'production') {
        return compileSassAndSaveMultiple({
            sassPath: path.resolve(srcFolder, 'scss/'),
            cssPath: path.resolve(publicFolder, 'css/'),
            files: cssConfig.sassFilesToCompile
        }).then((): void => {
            setupCleanupOnExit();
        }).catch((error): void => {
            throw new Error(error);
        });
    }
    else {
        // If not staging or production, just compile the libs.scss

        return compileSassAndSaveMultiple({
            sassPath: path.resolve(srcFolder, 'scss/'),
            cssPath: path.resolve(publicFolder, 'css/'),
            files: ['libs.scss']
        }).then((): void => {
            app.use('/css/:cssName', compileSass({
                sassFilePath: path.resolve(srcFolder, 'scss/')
            }));

            setupCleanupOnExit();
        }).catch((error): void => {
            throw new Error(error);
        });
    }
};
