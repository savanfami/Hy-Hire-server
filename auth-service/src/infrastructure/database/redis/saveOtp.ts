import { Client } from "./redisClient";

export const storeOtp = async(email: string, otp: string):Promise<string|null> => {
    try{
        const key = `otp:${email}`
        const ttl = 600;
        console.log(key,"keyyyyy")

        await Client.set(key,otp)
    //   console.log(setotp,"settedand saved otp")
        await Client.expire(key,ttl) 
        const value = await Client.get(key)
        console.log(`otp  ${value}stored for email ${email} with expiry of ${ttl} seconds`);
        return value
    }catch(error:any) {
        console.error('error storing otp in redis',error?.message);
        throw new Error(error?.message)
    }
}