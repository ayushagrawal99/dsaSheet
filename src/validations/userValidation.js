const Joi = require('joi');

const userSignUpSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .trim()
    .required()
    .messages({
      'string.base': `"firstName" should be a type of 'text'`,
      'string.empty': `"firstName" cannot be an empty field`,
      'string.max': `"firstName" should have a maximum length of 20`,
      'any.required': `"firstName" is a required field`,
    }),
  
  lastName: Joi.string()
    .max(20)
    .trim()
    .optional()
    .messages({
      'string.base': `"lastName" should be a type of 'text'`,
      'string.max': `"lastName" should have a maximum length of 20`,
    }),

  emailId: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.base': `"emailId" should be a type of 'text'`,
      'string.empty': `"emailId" cannot be an empty field`,
      'string.email': `"emailId" must be a valid email`,
      'any.required': `"emailId" is a required field`,
    }),

  password: Joi.string()
    .trim()
    .min(8) 
    .required()
    .messages({
      'string.base': `"password" should be a type of 'text'`,
      'string.empty': `"password" cannot be an empty field`,
      'string.min': `"password" should have at least 8 characters`,
      'any.required': `"password" is a required field`,
    }),

  age: Joi.number()
    .required()
    .min(0)
    .messages({
      'number.base': `"age" should be a type of 'number'`,
      'number.min': `"age" should be greater than or equal to 0`,
    }),

  gender: Joi.string()
    .valid('male', 'female', 'others')
    .required()
    .messages({
      'string.base': `"gender" should be a type of 'text'`,
      'any.only': `"gender" must be one of 'male', 'female', or 'others'`,
    }),
});

const userSignInSchema = Joi.object({
  emailId: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.base': `"emailId" should be a type of 'text'`,
      'string.empty': `"emailId" cannot be an empty field`,
      'string.email': `"emailId" must be a valid email`,
      'any.required': `"emailId" is a required field`,
    }),

  password: Joi.string()
    .trim()
    .min(8) 
    .required()
    .messages({
      'string.base': `"password" should be a type of 'text'`,
      'string.empty': `"password" cannot be an empty field`,
      'string.min': `"password" should have at least 8 characters`,
      'any.required': `"password" is a required field`,
    }),
});

module.exports = {userSignUpSchema, userSignInSchema};