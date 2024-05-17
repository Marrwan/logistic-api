import { Model } from "sequelize";

export interface UserInterface extends Model<UserInterface | any> {
    id: number;
    username: string;
    email : string;
    password: string;
  }
  

  export interface PackageInterface extends Model<PackageInterface | any> {
    id: number;
    userId: number;
    name: string;
    status: string;
    pickupDate: Date;
    createdAt: Date;
  }
  

  export interface PackageHistoryInterface extends Model<PackageHistoryInterface | any> {
    id: number;
    packageId: number;
    status: string;
    updatedAt: Date;
  }
  