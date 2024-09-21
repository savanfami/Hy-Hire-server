import server from './presentation/index'
import { connectDB } from './config/config';
import { startConsumer,stopConsumer } from './infrastructure/kafka/consumer/consumer';



(async ()=>{
    try{

        server
       await connectDB()
       await startConsumer()


    }catch(error:any){
        console.error('error during initialization',error.message||error);
        process.exit()
    }finally{
        process.on("SIGINT",async()=>{
            console.log('server shutting down');
            stopConsumer()
            process.exit();
        })
    }

})();