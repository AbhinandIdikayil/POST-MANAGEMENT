import mongoose, { Document } from "mongoose";


export interface IPostModel extends Document {
    userId: mongoose.Types.ObjectId;
    title: string,
    description: string,
    image: string
}

export interface IPost extends Document {
    userId: mongoose.Types.ObjectId;
    title: string,
    description: string,
    image: string
}