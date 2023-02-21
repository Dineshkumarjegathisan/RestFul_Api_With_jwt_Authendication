const Joi = require('joi')

const registerValidation = data => {
    const schema = Joi.object({
        userName: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6).
            required()
    });
    const options = {
        
        abortEarly: false
    };
    return schema.validate(data, options);
};




const loginValidation = data =>{
    const schema = Joi.object({

        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6).
            required()
    });
    const options ={
        abortEarly: false 
    };
    return schema.validate(data, options);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;



