import Joi from 'joi';

const authSchemas = {
  login: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  register: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
};

export default authSchemas;