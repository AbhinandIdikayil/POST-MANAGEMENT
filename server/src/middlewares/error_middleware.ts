import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom_error";


export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    let message = 'Internal server error';
    let success = false;
    let status = 500;

    if (err instanceof CustomError) { //! access the errors throwed by custom errors
        message = err.message;
        success = err.success;
        status = err.status
    }

    return res.status(status).json({message, success})
}