

export interface IapplyForJobUsecase{
    execute(companyId:string,resume:string,jobId:string,userId:string):Promise<boolean|null>
}