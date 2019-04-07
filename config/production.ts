import * as path from 'path';

export default {
    tracking: {
        matomo: {
            url: 'https://url-to-matomo/matomo.php',
            siteId: 1
        }
    },
    folders: {
        publicDistFolder: path.resolve(__dirname, '../dist/public')
    }
};
