"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// models/user.model.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const package_model_1 = require("./package.model");
exports.User = db_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.User.hasMany(package_model_1.Package, { foreignKey: 'userId' });
package_model_1.Package.belongsTo(exports.User, { foreignKey: 'userId' });
