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
exports.getQuestionsBySurveyId = void 0;
const client_1 = require("@prisma/client");
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const analyticsHelpers_1 = require("../helpers/analyticsHelpers");
const prisma = new client_1.PrismaClient();
function getQuestionsBySurveyId(surveyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const questions = yield prisma.question.findMany({ where: { surveyId } });
            const questionsWithAnalytics = [];
            for (const question of questions) {
                const responses = yield prisma.response.findMany({
                    where: { questionId: question.id },
                });
                const analytics = yield (0, analyticsHelpers_1.calculateQuestionAnalytics)(question, responses);
                questionsWithAnalytics.push(Object.assign(Object.assign({}, question), { analytics }));
            }
            return questionsWithAnalytics;
        }
        catch (error) {
            throw new HttpError_1.default(500, 'Internal server error');
        }
    });
}
exports.getQuestionsBySurveyId = getQuestionsBySurveyId;
