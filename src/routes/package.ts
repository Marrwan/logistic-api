import { Router } from 'express';
import { PackageController } from '../controllers/package.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { packageDto } from '../validations/package.dto';
import { isLogin } from '../middleware/auth.middleware';

const packageRouter = Router();
const packageController = new PackageController();

packageRouter.post('/', isLogin, validateRequest(packageDto), packageController.createPackage);
packageRouter.get('/:id', isLogin, packageController.getPackageById); 

export default packageRouter;
