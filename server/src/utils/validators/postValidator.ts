
import * as Joi from 'joi'
export const postValidator = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    image:Joi.string().required(),
})