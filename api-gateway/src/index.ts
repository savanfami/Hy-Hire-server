import express from "express";
import cookieParser from "cookie-parser";
import morgan from 'morgan'
import cors from 'cors';
import proxy from "express-http-proxy";
import { config } from "dotenv";

config()
const app=express()
const PORT:number=Number(process.env.PORT||8080)

app.use(express.json())
app.use(cookieParser())
app.use(morgan('tiny'))



const corsOptions={
   origin:'http://localhost:5173',
   methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
   credentials:true,
}

app.use(cors(corsOptions))

const routeConfigs=[
    {path:'/api/auth',destination:process.env.AUTH_SERVICE_URL}
]

console.log(routeConfigs)

routeConfigs.forEach(route=>{
    if(route.destination){
        app.use(route.path,proxy(route.destination))
    }
})


app.listen(PORT,()=>{
    console.log(`api gateway is running on http://localhost${PORT}`)
})