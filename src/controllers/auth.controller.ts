import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

import { withData, withMessage } from '../utils/response.utils';

let authService = new AuthService()
export class AuthController {
  constructor() {
   
  }

  async register(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {

      const { username, email, password } = req.validatedData as { username: string; email: string; password: string };

      const message = await authService.createUser({ username, email, password});

      return withMessage(res, message, 201)
    } catch (error : any) {

     next(error || 'Error creating user');
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password)
      return withData(res, data, 200)
    } catch (error: any) {

      next(error || 'Error trying to login, try again later');
    }
  }
}
