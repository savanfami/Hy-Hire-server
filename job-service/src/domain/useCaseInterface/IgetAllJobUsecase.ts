import { getalljobInterface } from "utils/types/types";

export interface IgetAllJobUsecase{
    execute():Promise<getalljobInterface[]|null>
}