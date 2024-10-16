import { IDependencies } from "./IDependencies";
import { IgetJobUsecase, IpostJobUsecase,IgetAllJobUsecase,IAddUserUsecase,IapplyForJobUsecase, IGetAllUserUsecase,IDeleteJobUsecase,IgetAllDataUsecase,IsaveJobUsecase, IsavedJobUsecase,IgetApplicantDetailsByJobUsecase,
    IUpdateHiringStatusUsecase,IGetApplicationByUserUsecase,ICreateChatUsecase
} from "domain/useCaseInterface";


export interface IUseCases{
    postJobUsecase:(dependencies:IDependencies)=>IpostJobUsecase
    getJobUsecase:(dependencies:IDependencies)=>IgetJobUsecase
    getAllJobUsecase:(dependencies:IDependencies)=>IgetAllJobUsecase
    addUserUsecase:(depedencies:IDependencies)=>IAddUserUsecase
    applyForJobUsecase:(depedencies:IDependencies)=>IapplyForJobUsecase
    getAllUserUsecase:(depedencies:IDependencies)=>IGetAllUserUsecase
    deleteJobUsecase:(dependenciese:IDependencies)=>IDeleteJobUsecase
    getAllDataUsecase:(dependencies:IDependencies)=>IgetAllDataUsecase
    saveJobUsecase:(dependencies:IDependencies)=>IsaveJobUsecase
    savedJobUsecase:(dependencies:IDependencies)=>IsavedJobUsecase
    getApplicantDetailsByJobUsecase:(dependencies:IDependencies)=>IgetApplicantDetailsByJobUsecase
    updateStatusUsecase:(dependencies:IDependencies)=>IUpdateHiringStatusUsecase
    getApplicationsByUserUsecase:(dependencies:IDependencies)=>IGetApplicationByUserUsecase

    createChatUsecase:(dependencies:IDependencies)=>ICreateChatUsecase
}