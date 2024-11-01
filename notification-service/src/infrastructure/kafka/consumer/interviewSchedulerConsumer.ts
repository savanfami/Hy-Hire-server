import { generateinterviewLinkMail } from "../../../utils/mailGenerator/generateInterviewLinkMail"
import { IUpdateStatusData } from "utils/mailGenerator/Types"

export default async (data:IUpdateStatusData):Promise<void>=>{
    try{
 
      await generateinterviewLinkMail(data)
    }catch(error){
        console.log(error)
    }
}