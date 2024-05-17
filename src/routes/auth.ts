import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { userDto } from '../validations/auth.dto';
import { validateRequest } from '../middleware/validation.middleware';
import { isLogin } from '../middleware/auth.middleware';

const authrouter = Router();
const authController = new AuthController();

authrouter.post('/register', validateRequest(userDto), authController.register);
authrouter.post('/login',  authController.login); 
authrouter.post('/test', isLogin)

export default authrouter;
