import { UserModel } from "../models/userModel";
import { IUser } from "../types/user";


export class UserDbFunctions {
    async create(data: IUser): Promise<IUser> {
        return await UserModel.create(data);
    }
    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email });
    }
}