import { IgetallUserUsecase,IupdateProfileUsecase,IgetUserDataUsecase ,IcheckSubscriptionStatusUsecase,IgetSubscriptionsUsecase} from "../../domain/useCaseInterface";
import { IDependencies } from './IDependencies';


export interface IUsecases{
    getallUserUsecase:(dependencies:IDependencies)=>IgetallUserUsecase
    updateProfileUsecase:(dependencies:IDependencies)=>IupdateProfileUsecase
    getUserDataUsecase:(dependencies:IDependencies)=>IgetUserDataUsecase
    checkSubscriptionStatusUsecase:(dependencies:IDependencies)=>IcheckSubscriptionStatusUsecase
    getSubscriptionsUsecase:(dependencies:IDependencies)=>IgetSubscriptionsUsecase
}