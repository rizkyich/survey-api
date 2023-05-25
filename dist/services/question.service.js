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
exports.deleteQuestion = exports.updateQuestion = exports.createQuestion = exports.getQuestionById = exports.getAllQuestions = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllQuestions(surveyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.question.findMany({
            where: {
                surveyId,
            },
        });
    });
}
exports.getAllQuestions = getAllQuestions;
function getQuestionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.question.findUnique({
            where: {
                id,
            },
        });
    });
}
exports.getQuestionById = getQuestionById;
function createQuestion(surveyId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.question.create({
            data: Object.assign(Object.assign({}, data), { surveyId }),
        });
    });
}
exports.createQuestion = createQuestion;
function updateQuestion(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.question.update({
            where: {
                id,
            },
            data,
        });
    });
}
exports.updateQuestion = updateQuestion;
function deleteQuestion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.question.delete({
            where: {
                id,
            },
        });
    });
}
exports.deleteQuestion = deleteQuestion;
