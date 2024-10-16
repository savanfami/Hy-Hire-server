import express, { Application, Request, Response } from "express";
import { config } from 'dotenv'
import cookieparser from 'cookie-parser'
import morgan from 'morgan'
import { router } from '../infrastructure/routes'
import { dependencies } from '../config/dependencies'
import { errorHandler } from "../utils/common/errorHandler";
config()
const app: Application = express()
const PORT = process.env.PORT || 8004

app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
      next();
    } else {
      express.json()(req, res, next);
    }
  });

// app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())
app.use(morgan('dev'))



app.use('/', router(dependencies))
app.use('*', (req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'api not found', status: 404 })
})

app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`server running on port:http://localhost${PORT}`)
})

export default app