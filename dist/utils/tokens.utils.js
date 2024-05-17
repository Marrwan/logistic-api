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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAccessToken = exports.generateAccessToken = exports.generateRandomNumber = exports.compareToken = exports.hashToken = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const crypto = __importStar(require("crypto"));
const jwt = __importStar(require("jsonwebtoken"));
const error_middleware_1 = require("../middleware/error/error.middleware");
const hashToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(10);
    const hashedToken = yield bcrypt.hash(token, salt);
    return hashedToken;
});
exports.hashToken = hashToken;
const compareToken = (plainText, hashedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield bcrypt.compare(plainText, hashedToken);
    return match;
});
exports.compareToken = compareToken;
const generateRandomNumber = (length) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate length parameter
    if (!Number.isInteger(length) || length <= 0) {
        throw new Error('Length must be a positive integer');
    }
    // Calculate range for random number generation
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    // Generate random number within range using crypto
    const randomValue = yield crypto.randomInt(min, max);
    return randomValue;
});
exports.generateRandomNumber = generateRandomNumber;
function generateAccessToken(user) {
    // var process: NodeJS.Process
    console.log({ token: user });
    let secret = process.env.SECRET_KEY;
    return jwt.sign(user, `${secret}`, { expiresIn: '1h' });
}
exports.generateAccessToken = generateAccessToken;
function decodeAccessToken(token) {
    try {
        let secret = process.env.SECRET_KEY;
        return jwt.verify(token, `${secret}`);
    }
    catch (error) {
        console.error('Error decoding access token:', error.message);
        throw new error_middleware_1.ValidationError("Invalid token");
    }
}
exports.decodeAccessToken = decodeAccessToken;
