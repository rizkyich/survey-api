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
exports.getResponsesBySurveyId = exports.getQuestionsBySurveyId = exports.getSurveyById = exports.getAllSurveys = void 0;
const client_1 = require("@prisma/client");
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const prisma = new client_1.PrismaClient();
function getAllSurveys() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return prisma.survey.findMany();
        }
        catch (error) {
            throw new HttpError_1.default(500, 'Internal server error');
        }
    });
}
exports.getAllSurveys = getAllSurveys;
function getSurveyById(surveyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const survey = yield prisma.survey.findUnique({ where: { id: surveyId } });
            if (!survey) {
                throw new HttpError_1.default(404, 'Survey not found');
            }
            return survey;
        }
        catch (error) {
            throw new HttpError_1.default(500, 'Internal server error');
        }
    });
}
exports.getSurveyById = getSurveyById;
function getQuestionsBySurveyId(surveyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return prisma.question.findMany({ where: { surveyId } });
        }
        catch (error) {
            throw new HttpError_1.default(500, 'Internal server error');
        }
    });
}
exports.getQuestionsBySurveyId = getQuestionsBySurveyId;
function getResponsesBySurveyId(surveyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return prisma.response.findMany({ where: { surveyId } });
        }
        catch (error) {
            throw new HttpError_1.default(500, 'Internal server error');
        }
    });
}
exports.getResponsesBySurveyId = getResponsesBySurveyId;
