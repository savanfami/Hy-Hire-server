

export interface IDeleteJobUsecase{
    execute(jobId:string):Promise<boolean|null>
}