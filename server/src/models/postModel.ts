
import mongoose, {model,  Schema } from "mongoose";
import { IPostModel } from "../types/post";


const articleSchema = new Schema<IPostModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const postModel = model<IPostModel>('Posts', articleSchema)