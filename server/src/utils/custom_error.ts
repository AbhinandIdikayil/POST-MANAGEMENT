import { HttpStatusCode } from "../constants/status_code";

export class CustomError extends Error {
    public status: number;
    public success: boolean;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.success = false;
    }

    static badRequest(message: string) {
        return new CustomError(message, HttpStatusCode.BAD_REQUEST)
    }

    static internalError(message: string) {
        return new CustomError(message, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }

    static unAuthorized(message: string) {
        return new CustomError(message, HttpStatusCode.UN_AUTHORIZED)
    }

    static notFound(message: string) {
        return new CustomError(message, HttpStatusCode.NOT_FOUND)
    }
}