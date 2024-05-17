import { NextFunction, Request, Response } from 'express';
import { PackageService } from '../services/package.service';
import { withMessage, withData } from '../utils/response.utils';
let packageService = new PackageService()
export class PackageController {
  // private packageService: PackageService;

  constructor() {

  }

  async createPackage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, status, pickupDate } = req.validatedData as { name: string, status: string, pickupDate: Date };
      const userId = (req.user as { id: number }).id;

      const newPackage = await packageService.createPackage({ name, status, pickupDate, userId });

      withData(res, newPackage)
    } catch (error) {
      console.error({ error });
      next({message: "Error creating package"});
    }
  }

  async getPackageById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const the_package = await packageService.getPackageById(parseInt(id));

      withData(res, the_package);
    } catch (error) {
      console.error(error);
      next({message : "Error getting package"})
    }
  }
 
  // Add other methods for updating package status, adding history, etc. (not implemented here)
}
