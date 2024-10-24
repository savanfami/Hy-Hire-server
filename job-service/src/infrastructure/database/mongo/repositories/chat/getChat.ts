import { IgetChatResponse } from "utils/types/types";
import { Chat } from "../../model/chatSchema";
import mongoose from "mongoose";

export const getChat = async (userId: string,role:string): Promise<IgetChatResponse[] | null> => {
    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        if(role==='user'){
            const chatWithCompanyData = await Chat.aggregate([
                {
                    $match: {
                        senderId: userObjectId
                    }
                },
                {
                    $lookup: {
                        from: 'companies',
                        localField: 'recieverId',
                        foreignField: '_id',
                        as: 'companyData'
                    }
                },
                {
                    $unwind: '$companyData'
                },
                {
                    $project: {
                        _id: 1,
                        'companyData.name': 1,
                        'companyData.icon': 1,
                        'companyData._id':1
                    }
                }
            ]);
            if (chatWithCompanyData.length === 0) {
                return null;
            }
    
            return chatWithCompanyData;

        }else if(role==='company'){
            const chatWithCompanyData = await Chat.aggregate([
                {
                    $match: {
                        recieverId: userObjectId
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'senderId',
                        foreignField: '_id',
                        as: 'companyData'
                    }
                },
                {
                    $unwind: '$companyData'
                },
                {
                    $project: {
                        _id: 1,
                        'companyData.name': 1,
                        'companyData.image': 1,
                        'companyData._id':1
                    }
                }
            ]);
            if (chatWithCompanyData.length === 0) {
                return null;
            }
    
            return chatWithCompanyData;
        }else{
            return null
        }

    } catch (error) {
        console.error("Error fetching chat:", error);
        return null;
    }
}
