"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.RouteNotFoundError = exports.ValidationError = exports.ServerError = exports.UserNotFoundError = exports.UserExistsError = void 0;
const BaseError_1 = require("./BaseError");
const messages_constants_1 = require("../../constants/messages.constants");
class UserExistsError extends BaseError_1.BaseError {
    constructor(message) {
        super('USER_EXISTS', messages_constants_1.USER_EXISTS.status, message || messages_constants_1.USER_EXISTS.message);
    }
}
exports.UserExistsError = UserExistsError;
class UserNotFoundError extends BaseError_1.BaseError {
    constructor(message) {
        super('USER_NOT_FOUND', messages_constants_1.USER_NOT_FOUND.status, message || messages_constants_1.USER_NOT_FOUND.message);
    }
}
exports.UserNotFoundError = UserNotFoundError;
class ServerError extends BaseError_1.BaseError {
    constructor(message) {
        super('SERVER_ERROR', messages_constants_1.ERROR_500.status, message || messages_constants_1.ERROR_500.message);
    }
}
exports.ServerError = ServerError;
class ValidationError extends BaseError_1.BaseError {
    constructor(message) {
        super('VALIDATION_ERROR', messages_constants_1.VALIDATION.status, message || messages_constants_1.VALIDATION.message);
    }
}
exports.ValidationError = ValidationError;
class RouteNotFoundError extends BaseError_1.BaseError {
    constructor(message) {
        super('ROUTE_NOT_FOUND', messages_constants_1.ROUTE_NOT_FOUND.status, message || messages_constants_1.ROUTE_NOT_FOUND.message);
    }
}
exports.RouteNotFoundError = RouteNotFoundError;
class UnauthorizedError extends BaseError_1.BaseError {
    constructor(message) {
        super('UNAUTHORIZED_ERROR', messages_constants_1.UNAUTHORIZED.status, message || messages_constants_1.UNAUTHORIZED.message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
exports.default = {
    UserExistsError,
    UserNotFoundError,
    ServerError,
    ValidationError,
    RouteNotFoundError,
    UnauthorizedError,
};
