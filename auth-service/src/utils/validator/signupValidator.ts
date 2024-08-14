import * as joi from 'joi'

export const signupValidation=joi.object({
    name:joi.string().min(3),
    email:joi.string().required().email(),
    password:joi.string().required().min(4),
    confirmPassword:joi.string().required().min(4),
    website:joi.string().min(4),
    industry:joi.string(),
    role:joi.string().required()
})