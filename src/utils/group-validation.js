import Joi from "joi";

export const groupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(32),
    direction: Joi.string().min(3).max(32),
    lessonDays: Joi.string(),
    lessonTime: Joi.string().regex(
      /^(2[0-3]|[01][0-9]):[0-5][0-9]-(2[0-3]|[01][0-9]):[0-5][0-9]$/
    ),
  });
  return schema.validate(data);
};
