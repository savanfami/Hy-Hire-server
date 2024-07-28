import { IDependencies } from 'application/interfaces/IDependencies'
import { Router } from 'express'
import { controller } from '../../presentation/controller'

 export const router=(dependencies:IDependencies)=>{
    const {signup}=controller(dependencies)

    const router=Router()

    router.route('/signup').post(signup)

    return router

}

