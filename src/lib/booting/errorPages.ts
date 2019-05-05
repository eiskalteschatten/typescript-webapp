import { Request, Response, Application, NextFunction } from 'express';

import HttpError from '../../errors/HttpError';


export default (app: Application): void => {
    // Catch 404 and forward to error handler
    app.use((req: Request, res: Response, next: NextFunction): void => {
        const error: HttpError = new HttpError('Not Found', 404);
        next(error);
    });

    // Development error handler - will print stacktrace
    if (app.get('env') === 'development') {
        app.use((error: HttpError, req: Request, res: Response): void => {
            res.status(error.status || 500);
            console.error(error.message);

            res.render('error.njk', {
                message: error.message,
                error: error
            });
        });
    }
    else {
        // Production error handler - no stacktraces leaked to user
        app.use((error: HttpError, req: Request, res: Response): void => {
            res.status(error.status || 500);
            console.error(error.message);
            res.render('error.njk');
        });
    }
};
