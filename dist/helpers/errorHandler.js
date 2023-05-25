"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error';
    const errorResponse = {
        error: errorMessage,
        statusCode: statusCode,
    };
    res.status(statusCode).json(errorResponse);
}
exports.errorHandler = errorHandler;
exports.default = errorHandler;
