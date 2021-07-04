import Joi from 'joi';

const noteSchemas = {
  note: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  })
};

export default noteSchemas;