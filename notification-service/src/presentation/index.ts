import express,{ Application } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config()
const app:Application=express()
const PORT=Number(process.env.PORT||8002)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.listen(PORT,()=>{
    console.log(`notification service running at http://localhost${PORT}`);
})

export default app 

