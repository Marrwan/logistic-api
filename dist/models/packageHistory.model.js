"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageHistory = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const package_model_1 = require("./package.model");
exports.PackageHistory = db_1.default.define('PackageHistory', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    packageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: package_model_1.Package,
            key: 'id',
        },
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
});
package_model_1.Package.hasMany(exports.PackageHistory, { foreignKey: 'packageId' });
exports.PackageHistory.belongsTo(package_model_1.Package, { foreignKey: 'packageId' });
