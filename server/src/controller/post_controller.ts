import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom_error";
import { postValidator } from "../utils/validators/postValidator";
import { postDbFunctions } from "./instance";



export class PostController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { data } = req.body;
            if (!data) throw CustomError.badRequest('JSON body structure error');
            const { userId: inputUserId, ...rest } = data
            const { error } = postValidator.validate(rest);
            if (error) {
                console.log(error, '------')
                throw CustomError.badRequest(error?.message?.replace(/"/g, ''));
            }
            if (!inputUserId) throw CustomError.badRequest('Id is missing');
            const result = await postDbFunctions.create(data);
            if (!result) throw CustomError.badRequest('Error while creation');
            const { userId, ...safeData } = result.toObject()
            return res.status(200).json({ message: 'post creaeted successfully', success: true, data: safeData });
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const { data } = req.body;
            const { value, error } = postValidator.validate(data);
            const { id, ...rest } = value

            if (error) {
                throw CustomError.badRequest(error?.message?.replace(/"/g, ''))
            }
            if (!id) {
                throw CustomError.badRequest('Id is required');
            }
            const result = await postDbFunctions.updateOne(id, rest);
            if (!result) throw CustomError.badRequest('Error while editing post');
            return res.status(200).json({ message: 'Updated successfully', success: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    async getAllPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await postDbFunctions.findAll();
            return res.status(200).json({ success: true, data })
        } catch (error) {
            next(error);
        }
    }

    async getPostOfOneUser(req: Request, res: Response, next: NextFunction) {
        try {
            if(!req?.query?.id){
                throw CustomError.badRequest('Id is not provided');
            }
            const data = await postDbFunctions.postsOfUneUser(req?.query?.id+'');
            return res.status(200).json({ success: true, data })
        } catch (error) {
            next(error);
        }
    }

    async deleteOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const { data } = req.body
            if (!data.id) {
                throw CustomError.badRequest('Id is required');
            }
            const result = await postDbFunctions.deleteOne(data.id);
            if (!result) throw CustomError.badRequest('Couldnt delete post');
            return res.status(200).json({ success: true, message: 'post deleted successfully', data: result });
        } catch (error) {
            next(error);
        }
    }
}