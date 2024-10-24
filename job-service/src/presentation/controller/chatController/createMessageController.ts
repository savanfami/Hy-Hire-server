import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../../utils/common/ErrorResponse";
import { ICreateMessagePayload } from "utils/types/types";

export const createMessageController = (dependencies: IDependencies) => {
  const { useCases: { createMessageUsecase } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const senderId = req.user?._id;
      if (!senderId) {
        throw ErrorResponse.badRequest('No sender found');
      }
      const data: ICreateMessagePayload = {
        chatId: req.body.chatId,
        senderId: senderId,
      };
      if (req.body.message) {
        data.message = req.body.message;
      }
      if (req.body.audio) {
        data.audio = req.body.audio
      }
      const response = await createMessageUsecase(dependencies).execute(data);
      if (!response) {
        throw ErrorResponse.internalError('Failed to create message');
      }

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
};
