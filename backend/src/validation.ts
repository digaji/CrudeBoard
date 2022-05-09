import joi from "joi";

export const registerValidation = ((data:object) => {
    const schema = joi.object({
        username: joi.string().min(5).required(),
        password: joi.string().min(5).required()
    });
    return schema.validate(data);
});

export const loginValidation = ((data:object) => {
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required()
    });
    return schema.validate(data);
});