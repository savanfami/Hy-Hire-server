import { getalljobInterface, IJobFilterParams } from "utils/types/types";

export interface IgetAllJobUsecase{
    execute(data:IJobFilterParams):Promise<getalljobInterface[]|null>
}