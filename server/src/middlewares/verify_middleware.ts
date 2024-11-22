import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { CustomError } from "../utils/custom_error";

interface CustomJwtPayload extends JwtPayload {
    id: string
}
export interface ModifiedRequest extends Request {
    user: CustomJwtPayload
}


export const verify = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.cookies)
        const token = req.cookies.USER;
        if (!token) {
            throw CustomError.unAuthorized('No token provided');
        }
        const decoded = jwt.verify(token, 'SECRET') as CustomJwtPayload;
        const { id } = decoded;
        (req as ModifiedRequest).user = { id };
        next();
    } catch (error) {
        throw CustomError.unAuthorized('Unauthorized')
    }
};