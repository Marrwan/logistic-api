import { DataTypes } from 'sequelize';
import  sequelize from '../config/db'
import { PackageHistoryInterface } from '../interface';
import { Package } from './package.model';


export const PackageHistory = sequelize.define<PackageHistoryInterface>('PackageHistory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    packageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Package,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  
  Package.hasMany(PackageHistory, { foreignKey: 'packageId' });
  PackageHistory.belongsTo(Package, { foreignKey: 'packageId' });