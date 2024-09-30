import { ErrorResponse } from "../../../../utils/common/ErrorResponse";
import { userModel } from "../model/userMode";
import { UserEntity } from "domain/entities/userEntity";

export const addUser = async (data: Partial<UserEntity>): Promise<boolean | null> => {
    try {
        const updateData: Partial<UserEntity> = {};
        const email = data?.email
        if (!email) {
            return null;
        }
        if (data.name) updateData.name = data.name;
        if (data.email) updateData.email = data.email;
        if (data._id) updateData._id = data._id;
        if (data.location!==undefined) updateData.location = data.location;
        if (data.image) updateData.image = data.image;
        if (data.phone!==undefined) updateData.phone = data.phone;
        if (data.aboutMe!==undefined) updateData.aboutMe = data.aboutMe;
        if (data.experiences) updateData.experiences = data.experiences;
        if (data.education) updateData.education = data.education;
        if (data.skills) updateData.skills = data.skills;
        if (data.socialLinks) updateData.socialLinks = data.socialLinks;
        if (data.resumes) updateData.resumes = data.resumes;
        if (data.profileCompleted) updateData.profileCompleted = data.profileCompleted
        const result = await userModel.findOneAndUpdate(
            { email },
            { $set: updateData },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
        if (!result) {
            return null;
        } else {
            return true
        }
    } catch (error: any) {
        throw new ErrorResponse(500,`Failed to  add or update profile: ${error.message}`);
    }
};