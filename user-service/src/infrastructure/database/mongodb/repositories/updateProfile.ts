import { userModel } from "../model/userModel";
import { UserEntity } from "domain/entity";

export const updateProfile = async (email: string, data: Partial<UserEntity>): Promise<UserEntity | null> => {
    try {
        const updateData: Partial<UserEntity> = {};

        if (data.name) updateData.name = data.name;
        if (data.location) updateData.location = data.location;
        if (data.image) updateData.image = data.image;
        if (data.phone) updateData.phone = data.phone;
        if (data.aboutMe) updateData.aboutMe = data.aboutMe;
        if (data.experiences) updateData.experiences = data.experiences;
        if (data.education) updateData.education = data.education;
        if (data.skills) updateData.skills = data.skills;
        if (data.socialLinks) updateData.socialLinks = data.socialLinks;
        if (data.resumes) updateData.resumes = data.resumes;
        console.log(updateData,'upddatetetetedatat')
        const updatedData = await userModel.findOneAndUpdate(
            { email },
            { $set: updateData },
            {
                new: true, runValidators: true,
                select: '-password',
            }
        );
        if (!updatedData) {
            console.log('No document found with the given email:', email);
            return null;
        }
        // console.log('Updated data:', updatedData);
        return updatedData as unknown as UserEntity
    } catch (error: any) {
        console.error('Error in updateProfile:', error);
        throw new Error(`Failed to update profile: ${error.message}`);
    }
};