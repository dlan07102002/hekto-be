const Joi = require("joi");

const authValidation = {
    registerSchema: Joi.object({
        email: Joi.string().email().max(191).required(),
        firstName: Joi.string().min(2).max(191).required(),
        lastName: Joi.string().min(2).max(191).required(),
        password: Joi.string().min(4).max(191).required(),
    }),

    loginSchema: Joi.object({
        email: Joi.string().email().max(191).required(),
        password: Joi.string().min(4).max(191).required(),
    }),
};

module.exports = authValidation;
