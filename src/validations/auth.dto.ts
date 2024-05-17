import * as Joi from 'joi';

const emailDto = {
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .required()
    .messages({
      'string.email': `Email should be a valid mail format, abi u dey ment `,
      'string.empty': `Email cannot be an empty field, which village u come from `,
      'any.required': `Email is a required field, who are u sef ? `,
    }),
};

const passwordDto = {
  password: Joi.string()
    .trim()
    .min(6)
    .required()
    .messages({
      'string.base': `Password should be a valid format`,
      'string.empty': `Password cannot be empty field`,
      'string.min': `Password should be at least 6 characters long, abi u wan make them hack am ? ‍♂️`,
    }),
};

// User Schema
export const userDto = Joi.object({
  username: Joi.string().trim().required().messages({
    'string.empty': `Username cannot be empty`,
    'any.required': `Username is required`,
  }),
  ...emailDto,
  ...passwordDto,
});




