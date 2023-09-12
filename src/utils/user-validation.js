import Joi from "joi";
export const userValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(3).max(32).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/),
    phone_number: Joi.string()
      .trim()
      .regex(/^9989[012345789][0-9]{7}$/),
  });
  return schema.validate(data);
};
