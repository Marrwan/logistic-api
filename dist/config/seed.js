"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const auth_service_1 = require("../services/auth.service");
const package_service_1 = require("../services/package.service");
const tokens_utils_1 = require("../utils/tokens.utils");
const db_1 = __importDefault(require("./db"));
let authService = new auth_service_1.AuthService();
let packageService = new package_service_1.PackageService();
db_1.default.sync();
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let password = yield (0, tokens_utils_1.hashToken)("Qwerty12345#");
    const users = [
        {
            username: 'Aisha',
            email: 'abdulbasit.doe@example.com',
            password: password,
        },
        {
            username: 'Afnaan',
            email: 'nurayn.doe@example.com',
            password: password,
        },
    ];
    yield users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
        yield authService.createUser(user);
    }));
    console.log('Users seeded successfully');
});
const seedPackages = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.findAll(); // Retrieve all created users
    const packages = [
        {
            name: 'Package 1',
            status: 'Received',
            pickupDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
            userId: users[0].id,
        },
        {
            name: 'Package 2',
            status: 'In Transit',
            pickupDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            userId: users[1].id,
        },
        {
            name: 'Package 3 ',
            status: 'Pending',
            pickupDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            userId: users[Math.floor(Math.random() * users.length)].id,
        },
        {
            name: 'Package 4 ',
            status: 'Pending',
            pickupDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            userId: users[1].id,
        },
    ];
    yield packages.forEach((thePackage) => __awaiter(void 0, void 0, void 0, function* () {
        yield packageService.createPackage(thePackage);
    }));
    //   await Package.bulkCreate(packages);
    console.log('Packages seeded successfully');
});
const runSeeds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield seedUsers();
        yield seedPackages();
        process.exit(0); // Exit process after seeding
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1); // Exit process with error code on failure
    }
});
runSeeds();
