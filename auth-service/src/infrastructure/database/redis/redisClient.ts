// import { Redis } from "ioredis"

// export const Client=new Redis()

// Client.on("connect",()=>{
//     console.log('connected to redis')
// })

import { Redis } from "ioredis";

const redisURL = "rediss://red-csmt12qj1k6c73do3fr0:EZfc4ESbYfrnHYh3BI9wrWLLYmbQ9Hvu@oregon-redis.render.com:6379";


export const Client = new Redis(redisURL);

Client.on("connect", () => {
  console.log("Connected to Redis");
});

Client.on("error", (err) => {
  console.error("Redis connection error:", err);
});