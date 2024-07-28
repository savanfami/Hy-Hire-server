import {ISigupuserUsecase} from '../../domain/useCaseInterface'


export interface IUsecases {
    signupuserUseCase:(dependencies:any)=>ISigupuserUsecase;
}
