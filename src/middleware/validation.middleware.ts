import * as Joi from "joi";
import { ValidationError } from "./error/error.middleware";
export const validateRequest = (schema: Joi.ObjectSchema, property = 'body') => {
    return (req: any, res: any, next: any) => {
      const validation = schema.validate(req[property], { allowUnknown: true });
  
      if (validation.error) {
        const error = validation.error.details.map((e) => e.message);
        throw new ValidationError(error.join(","));
      }
  
      req.validatedData = validation.value;
      next();
    };
  };