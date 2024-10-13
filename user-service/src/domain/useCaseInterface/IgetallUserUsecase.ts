import { getAllUserResponse, IsearchUser } from "utils/types/types";


export interface IgetallUserUsecase{
  execute(data:IsearchUser):Promise<getAllUserResponse|null>
}