import { IChatpayload } from "utils/types/types"

export const createChat = async (data:IChatpayload): Promise<boolean | null> => {
    try {

        return true

    } catch (error) {
        throw error
    }
}