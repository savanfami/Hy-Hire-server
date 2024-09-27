import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { loginValidator } from "../../utils/validator/loginValidator";
import { generateToken } from "../../utils/jwt/generateToken";

export const loginContoller = (dependencies: IDependencies) => {
    const { useCases: { loginuserUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { value, error } = loginValidator.validate(req.body)
            console.log(req.body,'body from login')
            if (error) {
                throw new Error(error?.message)
            }
            const { email, password } = value
            const result = await loginuserUsecase(dependencies).execute(email, password);
            if (result) {
                const token = generateToken({ _id:`${result?._id}`, email: result?.email, role: String(result?.role), exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) ?? '' })
                res.cookie('access_token', token, {
                    maxAge: 24 * 60 * 60 * 1000,
                })

                return res.status(200).json({
                    success: true,
                    data: {
                        name: result.name,
                        email: result.email,
                        role:result.role
                    },
                    message: "Login successfull",
                })
            } else {
                return res.status(400).json({ "message": "something happened" })
            }
        } catch (error) {
            next(error)
        }
    }
}