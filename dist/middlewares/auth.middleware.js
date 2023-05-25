"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, configs_1.jwtSecret);
        req.user = { userId: decoded.userId };
        next();
    }
    catch (error) {
        return res.sendStatus(403);
    }
}
exports.authenticateToken = authenticateToken;
