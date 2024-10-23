import  express,{Application,Request,Response} from "express";
import { router } from "../infrastructure/routes";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import morgan from 'morgan'
import { errorHandler } from "../utils/common";
import { dependencies } from "../config/dependencies";
import { PORT } from "../config/envConfig/config";
import path from "path";
import fs from 'fs'
dotenv.config()

const app:Application=express()

const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else { 
    app.use(morgan('common', { stream: accessLogStream }));
}

app.use('/',router(dependencies))

app.use('*',(req:Request,res:Response)=>{
    res.status(404).json({success:false,message:'api not found',status:404})
})


app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`auth server running on port: http://localhost${PORT}`)
})

export default app