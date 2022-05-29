import joi from "joi";

export const registerValidation = ((data:object) => {
    const schema = joi.object({
        email: joi.string().min(5).email().required(),
        password: joi.string().min(5).required()
    });
    return schema.validate(data);
});

export const loginValidation = ((data:object) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    return schema.validate(data);
});