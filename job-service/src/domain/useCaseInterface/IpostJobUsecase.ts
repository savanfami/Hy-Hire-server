import { jobEntity } from "domain/entities";

export interface IpostJobUsecase{
    execute(data:jobEntity):Promise<jobEntity|null>
}