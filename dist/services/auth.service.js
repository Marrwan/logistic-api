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
exports.AuthService = void 0;
const error_middleware_1 = require("../middleware/error/error.middleware");
const user_model_1 = require("../models/user.model");
const tokens_utils_1 = require("../utils/tokens.utils");
class AuthService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = user;
            let the_user = yield this.getUserByEmail(email);
            if (the_user) {
                throw new error_middleware_1.UserExistsError();
            }
            const hashedPassword = yield (0, tokens_utils_1.hashToken)(password);
            const newUser = user_model_1.User.create({
                username,
                email,
                password: hashedPassword
            });
            return "Account created successfully";
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield user_model_1.User.findOne({ where: { username } });
            // console.log({foundUser: user});
            return user === null || user === void 0 ? void 0 : user.dataValues;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield user_model_1.User.findOne({ where: { email } });
            return user === null || user === void 0 ? void 0 : user.dataValues;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ email, password });
            let user = yield this.getUserByEmail(email);
            if (!user) {
                throw new error_middleware_1.UserNotFoundError();
            }
            const isPasswordValid = yield (0, tokens_utils_1.compareToken)(password, user.password);
            if (!isPasswordValid) {
                throw new error_middleware_1.ValidationError("INVALID CREDENTIALS");
            }
            const access_token = yield (0, tokens_utils_1.generateAccessToken)(user);
            return Object.assign(Object.assign({ access_token }, user), { password: null });
        });
    }
}
exports.AuthService = AuthService;
