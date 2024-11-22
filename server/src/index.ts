import express from 'express'
import { env } from './config/env'
import { route } from './routes';
import { connectDB } from './config/db_connection';
import { errorMiddleware } from './middlewares/error_middleware';
import cors from 'cors'
import cookie from 'cookie-parser'
import { corsOption } from './config/cors_option';
const app = express()

app.use(cors(corsOption));
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', route);
app.use(errorMiddleware)

connectDB();

app.listen(Number(env.PORT), () => {
    console.log(` 🛡️  server is running on port:${env.PORT} 🛡️`)
});