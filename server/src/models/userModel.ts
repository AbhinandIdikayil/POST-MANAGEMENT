import { CallbackError, model, Schema } from "mongoose";
import { IUser } from "../types/user";
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10
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

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(this?.password, salt);
        // Replace the plain text password with the hash
        this.password = hash;
        next();
    } catch (error) {
        next(error as CallbackError);
    }
})


UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this?.password)
}


export const UserModel = model<IUserDocument>('Users', UserSchema)