declare namespace Express {
    export interface Request {
        lang?: string;
        status?: number;
        message?: string;
    }
}
