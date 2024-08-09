import server from './presentation/index'

(async ()=>{
    try{

        server

    }catch(error:any){
        console.error('error during initialization',error.message||error);
        process.exit(1)
    }finally{
        process.on("SIGINT",async()=>{
            console.log('server shutting down');
        })
    }

})()