import { userModel } from "../model/userMode";
import { UserEntity } from "domain/entities/userEntity";

export const addUser = async (data: Partial<UserEntity>): Promise<boolean | null> => {
    try {
        const updateData: Partial<UserEntity> = {};
        const email = data?.email
        if (!email) {
            console.log('Email is required');
            return null;
        }
        if (data.name) updateData.name = data.name;
        if (data.email) updateData.email = data.email;
        if (data._id) updateData._id = data._id;
        if (data.location) updateData.location = data.location;
        if (data.image) updateData.image = data.image;
        if (data.phone) updateData.phone = data.phone;
        if (data.aboutMe) updateData.aboutMe = data.aboutMe;
        if (data.experiences) updateData.experiences = data.experiences;
        if (data.education) updateData.education = data.education;
        if (data.skills) updateData.skills = data.skills;
        if (data.socialLinks) updateData.socialLinks = data.socialLinks;
        if (data.resumes) updateData.resumes = data.resumes;
        const result = await userModel.findOneAndUpdate(
            { email },
            { $set: updateData },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
        if (!result) {
            console.log('failed to update or create');  
            return null;
        }else{
            console.log('user creatd or updted successfully')
            return true
        }
      
    } catch (error: any) {
        console.error('Error in addUser:', error);
        throw new Error(`Failed to  add or update profile: ${error.message}`);
    }
};