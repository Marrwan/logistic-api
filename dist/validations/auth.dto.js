"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDto = void 0;
const Joi = __importStar(require("joi"));
const emailDto = {
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .trim()
        .required()
        .messages({
        'string.email': `Email should be a valid mail format, abi u dey ment `,
        'string.empty': `Email cannot be an empty field, which village u come from `,
        'any.required': `Email is a required field, who are u sef ? `,
    }),
};
const passwordDto = {
    password: Joi.string()
        .trim()
        .min(6)
        .required()
        .messages({
        'string.base': `Password should be a valid format`,
        'string.empty': `Password cannot be empty field`,
        'string.min': `Password should be at least 6 characters long, abi u wan make them hack am ? ‍♂️`,
    }),
};
// User Schema
exports.userDto = Joi.object(Object.assign(Object.assign({ username: Joi.string().trim().required().messages({
        'string.empty': `Username cannot be empty`,
        'any.required': `Username is required`,
    }) }, emailDto), passwordDto));
