"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const configs_1 = require("../configs");
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const [authType, authToken] = authHeader.split(' ');
        if (authType === configs_1.tokenType && authToken) {
            try {
                const decoded = jsonwebtoken_1.default.verify(authToken, configs_1.jwtSecret);
                req.user = { userId: decoded.userId };
                next();
                return;
            }
            catch (error) {
                return res.sendStatus(403);
            }
        }
    }
    next(new HttpError_1.default(401, 'Unauthorized'));
}
exports.authenticateToken = authenticateToken;
