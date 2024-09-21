import { CompanyEntity } from "domain/entities/companyEntity";
import { companyModel } from "../../database/mongo/model/companyModel";

export default async (data: CompanyEntity) => {
  try {
    console.log(data, 'data in job service');

     await companyModel.updateOne(
      { _id: data._id }, 
      {
        $set: { 
          name: data.name,
          email: data.email,
          password: data.password,
          isBlocked: data.isBlocked,
          website: data.website,
          location: data.location,
          foundedDate: data.foundedDate,
          description: data.description,
          icon: data.icon,
          sector: data.sector,
          subIndustry: data.subIndustry
        }
      },
      { upsert: true } 
    )

  } catch (error: any) {
    console.error('Error upserting company:', error.message);
    throw new Error(error?.message);
  }
};
