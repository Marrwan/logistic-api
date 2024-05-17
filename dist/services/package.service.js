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
exports.PackageService = void 0;
const error_middleware_1 = require("../middleware/error/error.middleware");
const package_model_1 = require("../models/package.model");
const sequelize_1 = require("sequelize");
const packageHistory_model_1 = require("../models/packageHistory.model");
class PackageService {
    createPackage(packageData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, status, pickupDate, userId } = packageData;
            let newPackage = yield package_model_1.Package.create({ name, status, pickupDate, userId });
            yield packageHistory_model_1.PackageHistory.create({ packageId: newPackage.id, status: newPackage.status });
            return { message: "Package created Successfully", package: newPackage };
        });
    }
    getPackageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let the_package = yield package_model_1.Package.findByPk(id, {
                include: {
                    model: packageHistory_model_1.PackageHistory, attributes: ["packageId",
                        "status",
                        "updatedAt"]
                }
            });
            if (!the_package) {
                throw new error_middleware_1.UserNotFoundError("Package not found");
            }
            return the_package;
        });
    }
    updatePackageStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("STA");
                const statuses = ['Pending', 'Received', 'In Transit', 'Out for Delivery', 'Pickup Ready'];
                // Find packages that haven't reached "Pickup Ready" state
                const packagesToUpdate = yield package_model_1.Package.findAll({
                    where: {
                        status: {
                            [sequelize_1.Op.notIn]: statuses.slice(statuses.indexOf('Pickup Ready')),
                        },
                    },
                });
                console.log({ packagesToUpdate });
                for (const packag of packagesToUpdate) {
                    // Get the current index of the package's status in the sequence
                    const currentStatusIndex = statuses.indexOf(packag.status);
                    console.log({ currentStatusIndex });
                    // Check if the next status exists
                    if (currentStatusIndex !== -1 && currentStatusIndex < statuses.length - 1) {
                        const newStatus = statuses[currentStatusIndex + 1];
                        // Update package status and create a history entry
                        yield packag.update({ status: newStatus });
                        yield packageHistory_model_1.PackageHistory.create({ packageId: packag.id, status: newStatus });
                        console.log(`Package ${packag.id} status updated to ${newStatus}`);
                    }
                    else {
                        console.log(`Package ${packag.id} already in a final state`);
                    }
                }
            }
            catch (error) {
                console.error('Error updating package statuses:', error);
            }
        });
    }
}
exports.PackageService = PackageService;
