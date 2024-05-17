"use strict";
// Utility functions for sending responses
Object.defineProperty(exports, "__esModule", { value: true });
exports.withData = exports.withMessage = exports.sendResponse = void 0;
const sendResponse = (response, status, data = {}) => {
    return response.status(status).send(Object.assign({}, data));
};
exports.sendResponse = sendResponse;
const withMessage = (response, message, status = 200) => {
    return (0, exports.sendResponse)(response, status, { message });
};
exports.withMessage = withMessage;
const withData = (response, data = {}, status = 200) => {
    return (0, exports.sendResponse)(response, status, { data });
};
exports.withData = withData;
