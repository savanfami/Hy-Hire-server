import { IgetallUserUsecase } from "../../domain/useCaseInterface";
import { IDependencies } from './IDependencies';


export interface IUsecases{
    getallUserUsecase:(dependencies:IDependencies)=>IgetallUserUsecase
}