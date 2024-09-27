import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import axios, { AxiosError } from "axios";

export const updateProfileController = (dependencies: IDependencies) => {
    const { useCases: { updateProfileUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req?.user?.email as string
            if (req.body) {
                const data = await updateProfileUsecase(dependencies).execute(email, req.body)
                if (data) {
                    try {
                        await axios.post(`${process.env.JOB_SERVICE_URL}/add-user`, data);
                        return res.status(200).json({
                            success: true, message: 'profile updated successfully', data
                        })
                    } catch (error: any) {
                        console.error("Failed to send data to job service:", error.message);
                        throw new Error("Job service communication failed");
                    }
                } else {
                    throw new Error("users doesn't exist")
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(`${error?.message}`)
            }
            next(error)
        }
    }
}