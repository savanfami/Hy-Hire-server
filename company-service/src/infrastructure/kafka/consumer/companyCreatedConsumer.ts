import {companyModel} from '../../database/mongodb/model/companyModel' 



type companyCreatedPayload={
    _id:string;
    name:string;
    email:string;
    password:string;
    isBlocked:boolean;
    role:string;

}

export default async (data:companyCreatedPayload)=>{
    try{

        const company=new companyModel({
            _id:data._id,
            name:data.name,
            email:data.email,
            password:data.password,
            role:data.role,
            isBlocked:data.isBlocked
        })

        await company.save()
        console.log('company saved in company service')

    }catch(error:any){
         throw new Error(error.message)
    }
}