import {ISigupuserUsecase,IverifyotpUsecase,IloginuserUsecase,IverifyemailUsecase,IfindUserByIdUsecase,IUpdatePasswordUsecase} from '../../domain/useCaseInterface'
import { IDependencies } from './IDependencies';

export interface IUsecases {
    signupuserUseCase:(dependencies:IDependencies)=>ISigupuserUsecase;
    verifyotpUsecase:(dependencies:IDependencies)=>IverifyotpUsecase;
    loginuserUsecase:(dependencies:IDependencies)=>IloginuserUsecase;
    findUserByEmailUsecase:(dependencies:IDependencies)=>IverifyemailUsecase;
    findUserByIdUsecase:(dependencies:IDependencies)=>IfindUserByIdUsecase;
    updatePasswordUsecase:(dependencies:IDependencies)=>IUpdatePasswordUsecase
}
