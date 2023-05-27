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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const configs_1 = require("../configs");
// Prisma client instance
const prisma = new client_1.PrismaClient();
function registerUser(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        return prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
    });
}
exports.registerUser = registerUser;
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new HttpError_1.default(401, 'Invalid credentials');
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new HttpError_1.default(401, 'Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, configs_1.jwtSecret);
        return token;
    });
}
exports.loginUser = loginUser;
