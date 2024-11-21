import { postModel } from "../models/postModel";
import { IPost, IPostModel } from "../types/post";



export class PostDbFunctions {
    async create(data: IPost): Promise<IPostModel> {
        return await postModel.create(data)
    }

    async findAll(): Promise<IPostModel[]> {
        return await postModel.find().select('-userId');
    }

    async deleteOne(id: string): Promise<IPostModel | null> {
        return await postModel.findByIdAndDelete(id)
    }

    async updateOne(id: string, data: IPost) {
        return await postModel.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        ).select('-userId')
    }
}