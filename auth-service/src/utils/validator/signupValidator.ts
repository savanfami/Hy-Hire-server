import * as joi from 'joi'

export const signupValidation=joi.object({
    username:joi.string().required().alphanum().min(3),
    email:joi.string().required().email(),
    password:joi.string().required().min(4),
    confirmPassword:joi.string().required().min(4),
    role:joi.string()
})