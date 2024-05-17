// models/user.model.ts
import { DataTypes } from 'sequelize';
import  sequelize from '../config/db'
import { UserInterface } from '../interface';
import { Package } from './package.model';



export const User = sequelize.define<UserInterface>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type : DataTypes.STRING,
    allowNull : false,
    unique : true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


User.hasMany(Package, { foreignKey: 'userId' });
Package.belongsTo(User, { foreignKey: 'userId' });
