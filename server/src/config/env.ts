
import { config } from 'dotenv'
config()

export const env = {
    PORT: process.env.PORT as string,
    MONGO_URI: process.env.MONGO_URI as string,
    CLIENT_URI: process.env.CLIENT
}