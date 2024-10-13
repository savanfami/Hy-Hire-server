import { IRepositories } from "./IRepositores";
import { IUseCases } from "./IUsecases";


export interface IDependencies{
    repositories:IRepositories;
    useCases:IUseCases
}  