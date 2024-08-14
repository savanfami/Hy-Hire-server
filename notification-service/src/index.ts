import server from './presentation/index'
import { startConsumer,stopConsumer } from './infrastructure/kafka/consumer/consumer';
(async()=>{
    try {
        server;
        await startConsumer()
    } catch (error:any) {
        console.error('error during initialization',error.message||error);
        process.exit(1)
    }finally{
        process.on("SIGINT",async()=>{
            console.log('server shutting down');
            stopConsumer();
            process.exit();
        })
    }
})()




