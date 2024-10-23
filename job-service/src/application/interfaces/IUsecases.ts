import { IgetApplicationDetailsUsecase } from "domain/useCaseInterface/IgetApplicationDetailsUsecase";
import { IDependencies } from "./IDependencies";
import {
    IgetJobUsecase, IpostJobUsecase, IgetAllJobUsecase, IAddUserUsecase, IapplyForJobUsecase, IGetAllUserUsecase, IDeleteJobUsecase, IgetAllDataUsecase, IsaveJobUsecase, IsavedJobUsecase, IgetApplicantDetailsByJobUsecase,
    IUpdateHiringStatusUsecase, IGetApplicationByUserUsecase, ICreateChatUsecase,
    IGetCountUsecase,
    IgetChatUsecase,
    ICreateMessageUsecase
} from "domain/useCaseInterface";


export interface IUseCases {
    postJobUsecase: (dependencies: IDependencies) => IpostJobUsecase
    getJobUsecase: (dependencies: IDependencies) => IgetJobUsecase
    getAllJobUsecase: (dependencies: IDependencies) => IgetAllJobUsecase
    addUserUsecase: (depedencies: IDependencies) => IAddUserUsecase
    applyForJobUsecase: (depedencies: IDependencies) => IapplyForJobUsecase
    getAllUserUsecase: (depedencies: IDependencies) => IGetAllUserUsecase
    deleteJobUsecase: (dependenciese: IDependencies) => IDeleteJobUsecase
    getAllDataUsecase: (dependencies: IDependencies) => IgetAllDataUsecase
    saveJobUsecase: (dependencies: IDependencies) => IsaveJobUsecase
    savedJobUsecase: (dependencies: IDependencies) => IsavedJobUsecase
    getApplicantDetailsByJobUsecase: (dependencies: IDependencies) => IgetApplicantDetailsByJobUsecase
    updateStatusUsecase: (dependencies: IDependencies) => IUpdateHiringStatusUsecase
    getApplicationsByUserUsecase: (dependencies: IDependencies) => IGetApplicationByUserUsecase
    getCountUsecase: (dependencies: IDependencies) => IGetCountUsecase
    createChatUsecase: (dependencies: IDependencies) => ICreateChatUsecase
    getApplicationDetailsUsecase: (dependencies: IDependencies) => IgetApplicationDetailsUsecase
    getChatUsecase: (dependencies: IDependencies) => IgetChatUsecase
    createMessageUsecase: (dependencies: IDependencies) => ICreateMessageUsecase
}