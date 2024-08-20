import {ISigupuserUsecase,IverifyotpUsecase,IloginuserUsecase,IverifyemailUsecase,IfindUserByIdUsecase,IUpdatePasswordUsecase,IcreateUserUsecase,IfindbyIdandUpdateUsecase} from '../../domain/useCaseInterface'
import { IDependencies } from './IDependencies';

export interface IUsecases {
    signupuserUseCase:(dependencies:IDependencies)=>ISigupuserUsecase;
    verifyotpUsecase:(dependencies:IDependencies)=>IverifyotpUsecase;
    loginuserUsecase:(dependencies:IDependencies)=>IloginuserUsecase;
    findUserByEmailUsecase:(dependencies:IDependencies)=>IverifyemailUsecase;
    findUserByIdUsecase:(dependencies:IDependencies)=>IfindUserByIdUsecase;
    updatePasswordUsecase:(dependencies:IDependencies)=>IUpdatePasswordUsecase;
    createUserUsecase:(dependencies:IDependencies)=>IcreateUserUsecase;
    findByIdandUpdateUsecase:(dependencies:IDependencies)=>IfindbyIdandUpdateUsecase;
}
