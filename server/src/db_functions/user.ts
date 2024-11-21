import { IUserDocument, UserModel } from "../models/userModel";
import { IUser } from "../types/user";


export class UserDbFunctions {
    async create(data: IUser): Promise<IUserDocument> {
        return await UserModel.create(data);
    }
    async findByEmail(email: string): Promise<IUserDocument | null> {
        return await UserModel.findOne({ email }).exec();
    }
}