import Joi from "joi";

export const productValidateSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('').required(),
    type: Joi.string(),
    ornament_type: Joi.string(),
    price: Joi.number().precision(4).required(),  
    weight: Joi.number().precision(4).required(), 
    carat: Joi.number().required(),
    handmade_or_resale: Joi.boolean().required(),
    age_group: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female', 'Unisex').required(),
    holy_or_ceremonial: Joi.boolean().required(),
    categories: Joi.array().items(Joi.number()).required(),
    is_disable: Joi.boolean().default(false), 
});