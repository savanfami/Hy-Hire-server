
export interface IcompanyRequestUseCase{
    execute (email:string):Promise<boolean|null>
}