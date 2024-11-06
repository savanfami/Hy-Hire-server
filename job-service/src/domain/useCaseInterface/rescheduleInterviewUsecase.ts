import { IRescheduleInterviewPayload } from "utils/types/types";

export interface IRescheduleInterviewUsecase{
    execute(data:IRescheduleInterviewPayload):Promise<boolean|null>
}