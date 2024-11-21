import mongoose from "mongoose"
import { env } from "./env";


export const connectDB = async () => {
    try {
        if (!env.MONGO_URI) {
            throw new Error('Mongo URI is not available');
        } 
        await mongoose.connect(env.MONGO_URI);
    } catch (error: unknown) {
        if (error instanceof mongoose.Error) {
            console.error("Mongoose error:", error.message);
        } else if (error instanceof Error) {
            console.error("General error:", error.message);
        } else {
            console.error("Unknown error occurred:", error);
        }
        process.exit(1);
    }
}