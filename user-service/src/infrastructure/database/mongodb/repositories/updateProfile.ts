import { userModel } from "../model/userModel";
import { UserEntity } from "domain/entity";

export const updateProfile = async (email: string, data: Partial<UserEntity>): Promise<UserEntity | null> => {
    try {
        const updateData: Partial<UserEntity> = {};
        if (data.name) updateData.name = data.name;
        if (data.location!==undefined) updateData.location = data.location;
        if (data.image) updateData.image = data.image;
        if (data.phone!==undefined) updateData.phone = data.phone;
        if (data.aboutMe!==undefined) updateData.aboutMe = data.aboutMe;
        if (data.experiences) updateData.experiences = data.experiences;
        if (data.education) updateData.education = data.education;
        if (data.skills) updateData.skills = data.skills;
        if (data.socialLinks) updateData.socialLinks = data.socialLinks;
        if (data.resumes) updateData.resumes = data.resumes;
        const updatedData = await userModel.findOneAndUpdate(
            { email },
            { $set: updateData },
            {
                new: true, runValidators: true,
                select: '-password',
            }
        );
        if(updatedData?.aboutMe && updatedData?.phone && updatedData?.skills.length>0 && updatedData?.education.length>0 &&updatedData?.resumes.length>0 && updatedData?.location ){
            updatedData.profileCompleted=true
            await updatedData.save()
        }
        if (!updatedData) {
            return null;
        }
          return updatedData as unknown as UserEntity
    } catch (error: any) {
        console.error('Error in updateProfile:', error.message);
        throw new Error(`Failed to update profile: ${error.message}`);
    }
};