import { IDependencies } from './IDependencies';
import { IupdateProfileUseCase,IgetCompanyUseCase,IupdateSocialLinks,IcompanyRequestUseCase,IlistRequestUsecase,IupdateRequestUsecase,IgetAllCompanyUsecase,IfindByCategoryUsecase} from "../../domain/useCaseInterface"

export interface IUseCases {
    updateProfileUsecase(dependencies:IDependencies): IupdateProfileUseCase
    getCompanyDataUseCase(dependencies:IDependencies):IgetCompanyUseCase
    updateSocialLinksUsecase(dependencies:IDependencies):IupdateSocialLinks
    companyRequestUseCase(dependencies:IDependencies):IcompanyRequestUseCase
    listRequestUsecase(dependencies:IDependencies):IlistRequestUsecase
    updateRequestUsecase(dependencies:IDependencies):IupdateRequestUsecase
    getAllCompanyUsecase(dependencies:IDependencies):IgetAllCompanyUsecase
    findBycategoryUsecase(dependencies:IDependencies):IfindByCategoryUsecase
}