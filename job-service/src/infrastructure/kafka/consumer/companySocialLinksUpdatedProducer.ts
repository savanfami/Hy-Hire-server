import { CompanyEntity } from "domain/entities/companyEntity";
import { companyModel } from "../../database/mongo/model/companyModel";

export default async (data: CompanyEntity) => {
  try {
    console.log(data, 'data in job socila links===========>>>>>>>> service');

     await companyModel.findOneAndUpdate(
      { _id: data._id }, 
      {
        $set:data
      },
      { upsert: true } 
    )
  
  } catch (error: any) {
    console.error('Error upserting company:', error.message);
    throw new Error(error?.message);
  }
};
