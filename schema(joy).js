const Joi = require('joi');
 module.exports.ListingSchema=Joi.object({
    listing : Joi.object({

        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image: Joi.string().required(),
    }),
}).unknown(true);//allow extra fields






module.exports.reviewSchema=Joi.object({

    review: Joi.object({
        Comment:Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
    }),
     
}).unknown(true);