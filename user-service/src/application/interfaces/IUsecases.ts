import { IgetallUserUsecase,IupdateProfileUsecase,IgetUserDataUsecase } from "../../domain/useCaseInterface";
import { IDependencies } from './IDependencies';


export interface IUsecases{
    getallUserUsecase:(dependencies:IDependencies)=>IgetallUserUsecase
    updateProfileUsecase:(dependencies:IDependencies)=>IupdateProfileUsecase
    getUserDataUsecase:(dependencies:IDependencies)=>IgetUserDataUsecase
}