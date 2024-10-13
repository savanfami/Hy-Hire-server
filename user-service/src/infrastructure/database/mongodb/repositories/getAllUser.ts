import { getAllUserResponse, IsearchUser } from "utils/types/types";
import { userModel } from "../model/userModel";


export const getAllUser = async (data: IsearchUser): Promise<getAllUserResponse | null> => {
    try {
        const itemsPerPage:number = 5
        const page = data.page
        const skip = (page as number - 1) * itemsPerPage;
        const searchQuery = data.search
        const searchFilter = searchQuery ? {
            $or: [
                { name: { $regex: searchQuery, $options: "i" } },
                { email: { $regex: searchQuery, $options: "i" } },
            ]
        } : {}
        const totalItems = await userModel.countDocuments(searchFilter);
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const getUser = await userModel
            .find(searchFilter)
            .select("-password")
            .skip(skip)
            .limit(itemsPerPage)
            

        if (getUser) {
            return {
                totalItems,
                totalPages,
                itemsPerPage,
                data: getUser as unknown as any,
            };        
        } else {
            return null
        }
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}                   