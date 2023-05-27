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
exports.saveBulkAnswers = exports.saveAnswer = void 0;
const client_1 = require("@prisma/client");
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const prisma = new client_1.PrismaClient();
function saveAnswer(respondentName, responseValue, surveyId, questionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const survey = yield prisma.survey.findUnique({ where: { id: surveyId } });
        if (!survey) {
            throw new HttpError_1.default(404, 'Survey Id not found');
        }
        const question = yield prisma.question.findUnique({ where: { id: questionId } });
        if (!question) {
            throw new HttpError_1.default(404, 'Question Id not found');
        }
        const createdResponse = yield prisma.response.create({
            data: {
                respondentName,
                responseValue: JSON.stringify(Array.isArray(responseValue) ? responseValue : [responseValue]),
                surveyId,
                questionId,
            },
        });
        return createdResponse;
    });
}
exports.saveAnswer = saveAnswer;
function saveBulkAnswers(responses) {
    return __awaiter(this, void 0, void 0, function* () {
        const savedResponses = [];
        for (const response of responses) {
            const savedResponse = yield saveAnswer(response.respondentName, response.responseValue, response.surveyId, response.questionId);
            savedResponses.push(savedResponse);
        }
        return savedResponses;
    });
}
exports.saveBulkAnswers = saveBulkAnswers;
