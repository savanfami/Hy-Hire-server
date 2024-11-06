import { IgetInterviewStatus, IgetUserInteviewSchedules } from "utils/types/types";

export interface IgetInterviewStatusUsecase{
    execute(id:string):Promise<IgetInterviewStatus|null>
}

export interface IgetUserInterviewSchedulesUsecase{
    execute(userId:string):Promise<IgetUserInteviewSchedules[]|null>
}