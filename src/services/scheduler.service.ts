import { PackageService } from "./package.service";
import * as cron from "node-cron"


let packageService = new PackageService();

export class SchedulerService {

  constructor() {

  }

  async startBackgroundJob() {
    let update = async () => {
      await packageService.updatePackageStatus(); 
    };
   
      // Schedule the job to run every 2 minutes
    cron.schedule('*/2 * * * *', update);
   
    


  }
}