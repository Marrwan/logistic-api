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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageController = void 0;
const package_service_1 = require("../services/package.service");
const response_utils_1 = require("../utils/response.utils");
let packageService = new package_service_1.PackageService();
class PackageController {
    // private packageService: PackageService;
    constructor() {
    }
    createPackage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, status, pickupDate } = req.validatedData;
                const userId = req.user.id;
                const newPackage = yield packageService.createPackage({ name, status, pickupDate, userId });
                (0, response_utils_1.withData)(res, newPackage);
            }
            catch (error) {
                console.error({ error });
                next({ message: "Error creating package" });
            }
        });
    }
    getPackageById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const the_package = yield packageService.getPackageById(parseInt(id));
                (0, response_utils_1.withData)(res, the_package);
            }
            catch (error) {
                console.error(error);
                next({ message: "Error getting package" });
            }
        });
    }
}
exports.PackageController = PackageController;
