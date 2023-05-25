"use strict";
// UserController.ts
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
exports.register = exports.login = void 0;
const auth_service_1 = require("../services/auth.service");
const HttpError_1 = __importDefault(require("../errors/HttpError"));
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const token = yield (0, auth_service_1.loginUser)(email, password);
            res.json({ token });
        }
        catch (error) {
            if (error instanceof HttpError_1.default) {
                next(error);
            }
            else {
                next(new HttpError_1.default(500, 'Internal Server Error'));
            }
        }
    });
}
exports.login = login;
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            const user = yield (0, auth_service_1.registerUser)(username, email, password);
            res.status(201).json(user);
        }
        catch (error) {
            if (error instanceof HttpError_1.default) {
                next(error);
            }
            else {
                next(new HttpError_1.default(500, 'Internal Server Error'));
            }
        }
    });
}
exports.register = register;
