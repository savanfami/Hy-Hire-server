
export interface IsaveJobUsecase{
    execute(jobId:string,userId:string):Promise<boolean|null>
}