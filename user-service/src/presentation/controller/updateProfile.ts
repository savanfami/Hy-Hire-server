import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import axios from "axios";

export const updateProfileController = (dependencies: IDependencies) => {
    const { useCases: { updateProfileUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req?.user?.email as string
            if (req.body) {
                const data = await updateProfileUsecase(dependencies).execute(email, req.body)
                console.log(data)
                if (data) {
                    axios.post(`${process.env.JOB_SERVICE_URL}/add-user`, data)
                    // axios.post(`${process.env.AUTHSERVICE_URL}/add-user`,result) 
                    return res.status(200).json({
                        success: true, message: 'profile updated successfully', data
                    })
                } else {
                    throw new Error("users doesn't exist")
                }
            }
        } catch (error) {
            next(error)
        }
    }
}