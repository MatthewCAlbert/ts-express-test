import Joi from 'joi';

const schemas = {
  csrfExample: Joi.object({
    _csrf: Joi.string().required(),
  }),
  secretExample: Joi.object({
    _secret: Joi.string().required(),
  }),
  sendCommand: Joi.object({
    _secret: Joi.string().required(),
    command: Joi.string().valid("open", "close", "auto").required(),
  }),
};

export default schemas;