import { model, Schema } from "mongoose";
import { IUser } from "../types/user";
import bcrypt from 'bcrypt'
export interface IUserDocument extends IUser, Document {
    comparePassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
}, { timestamps: true });

UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this?.password)
}


export const UserModel = model<IUserDocument>('Users', UserSchema)