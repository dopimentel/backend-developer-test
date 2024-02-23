const Joi = require('joi');

const companyIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
});

const companySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    });

module.exports = {
    companyIdSchema,
    companySchema,
};
