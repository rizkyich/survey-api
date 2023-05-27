"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenType = exports.jwtExpiresIn = exports.jwtSecret = void 0;
exports.jwtSecret = process.env.SECRET_KEY || 'kingkong';
exports.jwtExpiresIn = '1d';
exports.tokenType = 'Bearer';
