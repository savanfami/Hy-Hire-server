import express, { Application, Request, Response } from "express";
import { config } from 'dotenv'
import cookieparser from 'cookie-parser'
import morgan from 'morgan'
import { dependencies } from "../config/dependencies";
import { router } from '../infrastructure/routes'
import { errorHandler } from "../utils/common/errorHandler";
import path from 'path'
import fs from 'fs'
import http from 'http'
import connectSocketIo from "../infrastructure/socket";
config()
const app: Application = express()
const PORT = process.env.PORT || 8007

const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())
const server = http.createServer(app)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('common', { stream: accessLogStream }));
}
app.use('/', router(dependencies))
app.use(errorHandler)
app.use('*', (req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'api not found', status: 404 })
})

connectSocketIo(server) 


server.listen(PORT, () => {
    console.log(`server running on port:http://localhost${PORT}`)
})

export default app 