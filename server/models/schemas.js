import Joi from "joi";

const locationSchema = Joi.object({
  author: Joi.string().required(),
  title: Joi.string().required(),
  // image: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
});

const reviewSchema = Joi.object({
  author: Joi.string().required(),
  body: Joi.string().required(),
  rating: Joi.number().required().min(1).max(5),
});

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export { locationSchema, reviewSchema, userSchema };
