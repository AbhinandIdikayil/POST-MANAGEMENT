import { model, Schema } from "mongoose";
import { IUser } from "../types/user";

const UserSchema = new Schema<IUser>({
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


export const UserModel = model<IUser>('Users', UserSchema)