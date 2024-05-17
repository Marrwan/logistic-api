// constants/messages.constant.ts

export interface ErrorMessage {
    status: number;
    message: string;
  }
  
  export const USER_EXISTS: ErrorMessage = {
    status: 409, // Conflict
    message: 'User already exists',
  };
  
  export const USER_NOT_FOUND: ErrorMessage = {
    status: 404, // Not Found
    message: 'User not found',
  };
  
  export const ERROR_500: ErrorMessage = {
    status: 500, // Internal Server Error
    message: 'Internal server error',
  };
  
  export const ROUTE_NOT_FOUND: ErrorMessage = {
    status: 404, // Not Found
    message: 'Route not found',
  };
  
  export const UNAUTHORIZED: ErrorMessage = {
    status: 401, // Unauthorized
    message: 'Unauthorized',
  };
  
  export const VALIDATION: ErrorMessage = {
    status: 400, // Bad Request
    message: 'Validation error',
  };
  

  