import { IDependencies } from "./IDependencies";
import { IgetJobUsecase, IpostJobUsecase,IgetAllJobUsecase,IAddUserUsecase } from "domain/useCaseInterface";


export interface IUseCases{
    postJobUsecase:(dependencies:IDependencies)=>IpostJobUsecase
    getJobUsecase:(dependencies:IDependencies)=>IgetJobUsecase
    getAllJobUsecase:(dependencies:IDependencies)=>IgetAllJobUsecase
    addUserUsecase:(depedencies:IDependencies)=>IAddUserUsecase
}