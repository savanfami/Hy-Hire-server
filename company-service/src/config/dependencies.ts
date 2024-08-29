import { IDependencies } from "../application/interfaces/IDependencies"
import * as useCases from '../application/useCases/index'
import * as repositories from '../infrastructure/database/mongodb/repositories'

export const dependencies:IDependencies={
   repositories,
   useCases

}
