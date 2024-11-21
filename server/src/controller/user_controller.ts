import { NextFunction, Request, Response } from "express"
import { userDbFunctions } from "./instance"
import { CustomError } from "../utils/custom_error";
import { loginValidator } from "../utils/validators/loginValidators";
import { signupValidator } from "../utils/validators/signupValidator";
import { generateToken } from "../utils/JWT/generateToken";



export class UserController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { data } = req.body
            const { error } = signupValidator.validate(data);
            console.log(error)
            if (error) {
                throw CustomError.badRequest(error?.message?.replace(/"/g, ''))
            }
            console.log(data);
            const existing = await userDbFunctions.findByEmail(data.email)
            if (existing) {
                throw CustomError.conflict('User already exists');
            }
            const user = await userDbFunctions.create(data)
            if (!user) {
                throw CustomError.badRequest('Failed to register')
            }
            const { password, ...safeUser } = user.toObject()
            let token = generateToken(safeUser._id + '')
            res.status(200)
                .cookie('USER', token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 60 * 60 * 24 * 1000 * 12 }) //! for 12 days
                .json({ success: true, data: safeUser });

        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { data } = req.body;
            if (!data) {
                throw CustomError.badRequest('JSON structure error');
            }
            const { value, error } = loginValidator.validate(data);
            if (error) {
                throw CustomError.badRequest(error?.message?.replace(/"/g, '') || 'Invalid request data');
            }
            if (!value.email) {
                throw CustomError.badRequest('Email is required');
            }
            if (!value.password) {
                throw CustomError.badRequest('Password is required');
            }
            const result = await userDbFunctions.findByEmail(value.email);
            if (!result) throw CustomError.badRequest('User not found');
            const isPassword = await result?.comparePassword(result.password)
            if (isPassword) {
                const { password, ...safeUser } = result.toObject ? result.toObject() : result;
                return res.status(200).json({ message: 'Logined succesfully', data: safeUser, success: true, })
            } else {
                throw CustomError.badRequest('Password is incorrect');
            }
        } catch (error) {
            next(error)
        }
    }
}