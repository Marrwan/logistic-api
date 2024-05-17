// BaseError.ts

export abstract class BaseError extends Error {
    readonly name: string;
    readonly statusCode: number;
    readonly isOperational: boolean;
  
    constructor(name: string, statusCode: number, description: string, isOperational = true) {
      super(description);
  
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = name;
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  