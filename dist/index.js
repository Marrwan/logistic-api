"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const package_1 = __importDefault(require("./routes/package"));
const scheduler_service_1 = require("./services/scheduler.service");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const errorHandler = (err, req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    console.log("I REACH OOO");
    if (!err.statusCode) {
        err.message = err.message || 'Internal Server Error'; // Set a generic message
    }
    if (err.message.includes("Validation")) {
        err.statusCode = 400;
    }
    if (err.name == 'Validation error') {
        err.statusCode = 400;
        err.message = err.message.replace('ValidationError: ', '');
    }
    return res.status(err.statusCode || 500).json({ error: err.message });
};
// sequelize.sync()
// Routes
app.use('/auth', auth_1.default);
app.use('/packages', package_1.default);
app.use(errorHandler);
let job = new scheduler_service_1.SchedulerService();
job.startBackgroundJob();
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
