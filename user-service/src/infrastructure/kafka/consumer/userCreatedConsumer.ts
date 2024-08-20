import {userModel} from '../../database/mongodb/model/userModel' 



type userCreatedpayload={
    _id:string;
    name:string;
    email:string;
    password:string;
    isBlocked:boolean;
    role:string;

}

export default async (data:userCreatedpayload)=>{
    try{

        const user=new userModel({
            _id:data._id,
            name:data.name,
            email:data.email,
            password:data.password,
            role:data.role,
            isBlocked:data.isBlocked
        })

        await user.save()
        console.log('user saved in user service')

    }catch(error:any){
         throw new Error(error?.message)
    }
}