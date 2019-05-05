export default class HttpError extends Error {
    public status?: number;

    public constructor(message: string, status: number = 404) {
        super(message);
        Object.setPrototypeOf(this, HttpError.prototype);
        this.status = status;
    }
}
