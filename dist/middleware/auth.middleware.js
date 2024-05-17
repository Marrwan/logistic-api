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
exports.isLogin = void 0;
const error_middleware_1 = require("./error/error.middleware");
const tokens_utils_1 = require("../utils/tokens.utils");
const isLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.header("authorization");
        token = token === null || token === void 0 ? void 0 : token.split(" ")[1];
        // Check if a token is present in the request
        if (!token) {
            throw new error_middleware_1.UnauthorizedError('Unauthorized: No token provided');
        }
        // Verify the token
        let decoded = yield (0, tokens_utils_1.decodeAccessToken)(token);
        if (!decoded) {
            throw new error_middleware_1.UnauthorizedError('Unauthorized: Please Login');
        }
        // If the token is valid, add the decoded user data to the request for further use
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.isLogin = isLogin;
