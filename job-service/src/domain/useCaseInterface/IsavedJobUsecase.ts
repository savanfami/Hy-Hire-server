import { getalljobInterface } from "utils/types/types";

export interface IsavedJobUsecase{
    execute(userId:string):Promise<getalljobInterface[]|null>
}