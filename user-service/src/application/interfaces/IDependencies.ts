import { IRepositories } from "./IRepositories";
import { IUsecases } from "./IUsecases";

export interface IDependencies {
    repositories:IRepositories;
    useCases:IUsecases;
}