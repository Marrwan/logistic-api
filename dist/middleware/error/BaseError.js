"use strict";
// BaseError.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(name, statusCode, description, isOperational = true) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BaseError = BaseError;
