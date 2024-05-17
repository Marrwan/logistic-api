"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
// models/package.model.ts
const sequelize_1 = require("sequelize");
const user_model_1 = require("./user.model");
const db_1 = __importDefault(require("../config/db"));
exports.Package = db_1.default.define('Package', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_model_1.User,
            key: 'id',
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    pickupDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
});
