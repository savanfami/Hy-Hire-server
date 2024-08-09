import * as Joi from 'joi'

export const loginValidator = Joi.object({
    email: Joi
        .string()
        .required()
        .email(),
    password: Joi   
        .string()
        .required()
})