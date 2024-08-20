import {userModel} from '../../database/mongodb/model/userModel' 

export type userBlockPayload={
    userId:string;
    isBlocked:boolean
}

export default async (data:userBlockPayload)=>{
    try{
      console.log(data,'data from block unblock')
    const updatedUserData=await userModel.findByIdAndUpdate(data.userId,
        {$set:{isBlocked:data.isBlocked}
    })
    if(!updatedUserData){
        console.error('user not found')
    }
    console.log('user data updated successfully',updatedUserData)
    }catch(error:any){
        throw new Error (error?.message)
    }
}