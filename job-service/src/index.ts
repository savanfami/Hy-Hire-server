import server from './presentation/index'
import { connectDB } from './config/config';
import { startConsumer,stopConsumer } from './infrastructure/kafka/consumer/consumer';
import { cronSchedule, startCronJob } from './utils/cronJob/croneJob';

(async ()=>{
    try{
        server
       await connectDB()
       await startConsumer()
       startCronJob()
    }catch(error:any){
        console.error('error during initialization',error.message||error);
        process.exit()
    }finally{
        process.on("SIGINT",async()=>{
            console.log('server shutting down');
            stopConsumer()
            cronSchedule.stop();
            process.exit();
        })
    }

})();