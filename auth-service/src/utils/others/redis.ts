import redis from 'redis';

console.log(process.env.REDIS_URL,'jajfdsasdjsdjasdsdlrediiiii')
 export const Redis=redis.createClient({
    url:process.env.REDIS_URL
})

Redis.on('error',(err)=>{
    console.error('redis error',err)
})