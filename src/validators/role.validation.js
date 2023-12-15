import Joi from 'joi';

const roleSchema = Joi.object({
    roleName: Joi.string().required(),
    isEnabled: Joi.boolean().default(true),
});

export { roleSchema };
