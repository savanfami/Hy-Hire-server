export interface IverifyemailUsecase{
    execute(email:string):Promise<boolean>
}