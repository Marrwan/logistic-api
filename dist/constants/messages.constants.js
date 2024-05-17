"use strict";
// constants/messages.constant.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION = exports.UNAUTHORIZED = exports.ROUTE_NOT_FOUND = exports.ERROR_500 = exports.USER_NOT_FOUND = exports.USER_EXISTS = void 0;
exports.USER_EXISTS = {
    status: 409, // Conflict
    message: 'User already exists',
};
exports.USER_NOT_FOUND = {
    status: 404, // Not Found
    message: 'User not found',
};
exports.ERROR_500 = {
    status: 500, // Internal Server Error
    message: 'Internal server error',
};
exports.ROUTE_NOT_FOUND = {
    status: 404, // Not Found
    message: 'Route not found',
};
exports.UNAUTHORIZED = {
    status: 401, // Unauthorized
    message: 'Unauthorized',
};
exports.VALIDATION = {
    status: 400, // Bad Request
    message: 'Validation error',
};
