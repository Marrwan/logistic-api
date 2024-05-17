import { UserNotFoundError } from "../middleware/error/error.middleware";
import { Package } from "../models/package.model";
import * as cron from 'node-cron';
import { User } from "../models/user.model";
import { Op } from "sequelize";
import { PackageHistory } from "../models/packageHistory.model";
interface PackageInterface {
  userId: number;
  name: string;
  status: string;
  pickupDate: Date;
}


export class PackageService {
  async createPackage(packageData: PackageInterface): Promise<any> {
    const { name, status, pickupDate, userId } = packageData;
    let newPackage = await Package.create({ name, status, pickupDate, userId });
    await PackageHistory.create({ packageId: newPackage.id, status: newPackage.status });
    return { message: "Package created Successfully", package: newPackage }
  }

  async getPackageById(id: number): Promise<any | null> {
    let the_package = await Package.findByPk(id, {
      include: {
        model: PackageHistory, attributes: ["packageId",
          "status",
          "updatedAt"]
      }
    })

    if (!the_package) {
      throw new UserNotFoundError("Package not found")
    }
    return the_package
  }

  async updatePackageStatus(): Promise<any> {

    try {
      console.log("STA");

      const statuses = ['Pending', 'Received', 'In Transit', 'Out for Delivery', 'Pickup Ready'];

      // Find packages that haven't reached "Pickup Ready" state
      const packagesToUpdate = await Package.findAll({
        where: {
          status: {
            [Op.notIn]: statuses.slice(statuses.indexOf('Pickup Ready')),
          },
        },
      });
      console.log(
        {packagesToUpdate}
      );
      

      for (const packag of packagesToUpdate) {


        // Get the current index of the package's status in the sequence
        const currentStatusIndex = statuses.indexOf(packag.status);
        console.log({ currentStatusIndex });

        // Check if the next status exists
        if (currentStatusIndex !== -1 && currentStatusIndex < statuses.length - 1) {
          const newStatus = statuses[currentStatusIndex + 1];

          // Update package status and create a history entry
          await packag.update({ status: newStatus });
          await PackageHistory.create({ packageId: packag.id, status: newStatus });

          console.log(`Package ${packag.id} status updated to ${newStatus}`);
        } else {
          console.log(`Package ${packag.id} already in a final state`);
        }
      }
    } catch (error) {
      console.error('Error updating package statuses:', error);
    }
  }

}



