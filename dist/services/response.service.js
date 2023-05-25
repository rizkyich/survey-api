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
exports.deleteResponse = exports.updateResponse = exports.createResponse = exports.getResponseById = exports.getAllResponses = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllResponses(surveyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.response.findMany({
            where: {
                surveyId,
            },
        });
    });
}
exports.getAllResponses = getAllResponses;
function getResponseById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.response.findUnique({
            where: {
                id,
            },
        });
    });
}
exports.getResponseById = getResponseById;
function createResponse(surveyId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.response.create({
            data: Object.assign(Object.assign({}, data), { surveyId }),
        });
    });
}
exports.createResponse = createResponse;
function updateResponse(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.response.update({
            where: {
                id,
            },
            data,
        });
    });
}
exports.updateResponse = updateResponse;
function deleteResponse(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.response.delete({
            where: {
                id,
            },
        });
    });
}
exports.deleteResponse = deleteResponse;