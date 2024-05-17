import { BaseError } from './BaseError';
import { ERROR_500, ROUTE_NOT_FOUND, UNAUTHORIZED, USER_EXISTS, USER_NOT_FOUND, VALIDATION } from '../../constants/messages.constants';


export class UserExistsError extends BaseError {
  constructor(message?: string) {
    super('USER_EXISTS', USER_EXISTS.status, message || USER_EXISTS.message);
  }
}

export class UserNotFoundError extends BaseError {
  constructor(message?: string) {
    super('USER_NOT_FOUND', USER_NOT_FOUND.status, message || USER_NOT_FOUND.message);
  }
}

export class ServerError extends BaseError {
  constructor(message?: string) {
    super('SERVER_ERROR', ERROR_500.status, message || ERROR_500.message);
  }
}

export class ValidationError extends BaseError {
  constructor(message?: string) {
    super('VALIDATION_ERROR', VALIDATION.status, message || VALIDATION.message);
  }
}

export class RouteNotFoundError extends BaseError {
  constructor(message?: string) {
    super('ROUTE_NOT_FOUND', ROUTE_NOT_FOUND.status, message || ROUTE_NOT_FOUND.message);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    super('UNAUTHORIZED_ERROR', UNAUTHORIZED.status, message || UNAUTHORIZED.message);
  }
}

export default {
  UserExistsError,
  UserNotFoundError,
  ServerError,
  ValidationError,
  RouteNotFoundError,
  UnauthorizedError,
};
