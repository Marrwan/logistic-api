"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const error_middleware_1 = require("./error/error.middleware");
const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const validation = schema.validate(req[property], { allowUnknown: true });
        if (validation.error) {
            const error = validation.error.details.map((e) => e.message);
            throw new error_middleware_1.ValidationError(error.join(","));
        }
        req.validatedData = validation.value;
        next();
    };
};
exports.validateRequest = validateRequest;
