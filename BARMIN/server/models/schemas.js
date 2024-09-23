import Joi from 'joi';

const locationSchema = Joi.object({
    location: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

const reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    })
})

export { locationSchema, reviewSchema };