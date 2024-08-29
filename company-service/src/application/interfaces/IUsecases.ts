import { IDependencies } from './IDependencies';
import { IupdateProfileUseCase,IgetCompanyUseCase,IupdateSocialLinks,IcompanyRequestUseCase } from "../../domain/useCaseInterface"

export interface IUseCases {
    updateProfileUsecase(dependencies:IDependencies): IupdateProfileUseCase
    getCompanyDataUseCase(dependencies:IDependencies):IgetCompanyUseCase
    updateSocialLinksUsecase(dependencies:IDependencies):IupdateSocialLinks
    companyRequestUseCase(dependencies:IDependencies):IcompanyRequestUseCase
}