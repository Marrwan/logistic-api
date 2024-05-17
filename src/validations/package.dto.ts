import * as Joi from 'joi';
// Package Schema
export const packageDto = Joi.object({
    name: Joi.string().trim().required().messages({
      'string.empty': `Package name cannot be empty`,
      'any.required': `Package name is required`,
    }),
    status: Joi.string().trim().required().messages({
      'string.empty': `Package status cannot be empty`,
      'any.required': `Package status is required`,
    }),
    pickupDate: Joi.date().required().messages({
      'any.required': `Pickup date is required`,
    }),
  });