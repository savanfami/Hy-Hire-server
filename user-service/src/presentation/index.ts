import express,{ Application} from 'express'
import { config } from 'dotenv'
import cookieparser from 'cookie-parser'
import morgan from 'morgan'
config()
const app:Application=express()
const PORT=process.env.PORT||8004

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(morgan('dev'))



app.listen(PORT,()=>{
    console.log(`server running on port:http://localhost${PORT}`)
})

export default app