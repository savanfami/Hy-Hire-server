import { IDependencies } from "application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/common";
import { hashPassword } from "../../utils/common/hashPassword";


export const resetPasswordController = (dependencies: IDependencies) => {
  const { useCases: { findUserByEmailUsecase, updatePasswordUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { values: { password } } = req.body
      const email = req.userData
      if (email) {
        const userExist = await findUserByEmailUsecase(dependencies).execute(email)
        if (!userExist) {
          return next(ErrorResponse.notFound('user not found'))
        }
        const hashedPassword = await hashPassword(password)
        const updatePassword = await updatePasswordUsecase(dependencies).execute(email, hashedPassword)
        // console.log(updatePassword, 'updated password successfullly', updatePassword)
        if (updatePassword) {
          return res.status(200).json({ success: true, message: 'password changed successfully' })
        } else {
          return next(ErrorResponse.internalError('failed to change password'))
        }
      } else {
        throw new Error('no email found')
      }


    } catch (error) {
      return next(ErrorResponse.internalError('Error changing password'));
    }
  }
}    