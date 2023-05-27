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
exports.getSurveyBySlug = exports.getSurveyById = exports.getAllSurveys = exports.editSurvey = exports.createSurvey = void 0;
const client_1 = require("@prisma/client");
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const prisma = new client_1.PrismaClient();
function createSurvey(title, slug, description, isPublished, userId, status, questions) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create the survey
            const survey = yield prisma.survey.create({
                data: {
                    title,
                    slug,
                    description,
                    status,
                    isPublished: questions.length ? isPublished : false,
                    userId,
                    questions: {
                        create: questions.length ? questions.map((question) => ({
                            text: question.text,
                            type: question.type,
                            options: question.options,
                            responses: {
                                create: [],
                            },
                        })) : [],
                    },
                    responses: {
                        create: [],
                    },
                },
                include: {
                    questions: true,
                },
            });
            return survey;
        }
        catch (error) {
            throw new HttpError_1.default(500, 'Failed to create survey');
        }
    });
}
exports.createSurvey = createSurvey;
function getQuestionCreateInput(question) {
    return {
        text: question.text,
        type: question.type,
        options: question.options,
        responses: {
            create: [],
        },
    };
}
function getQuestionUpdateInput(question) {
    return {
        text: question.text,
        type: question.type,
        options: question.options,
    };
}
function getNewQuestionsCreateInput(questions) {
    return questions
        .filter((question) => !question.id)
        .map((question) => getQuestionCreateInput(question));
}
function editSurvey(surveyId, title, slug, description, isPublished, status, questions) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Prepare the question upsert operations
            const updatedSurvey = yield prisma.survey.update({
                where: { id: surveyId },
                data: {
                    title,
                    slug,
                    description,
                    status,
                    isPublished,
                    questions: {
                        upsert: questions.map((question) => {
                            var _a;
                            return ({
                                where: { id: (_a = question.id) !== null && _a !== void 0 ? _a : '' },
                                create: getQuestionCreateInput(question),
                                update: getQuestionUpdateInput(question),
                            });
                        }),
                        deleteMany: {
                            id: {
                                notIn: questions.filter((question) => question.id).map((question) => question.id),
                            },
                        },
                        create: getNewQuestionsCreateInput(questions),
                    },
                },
                include: {
                    questions: true,
                },
            });
            return updatedSurvey;
        }
        catch (error) {
            console.log(error);
            throw new HttpError_1.default(500, 'Failed to edit survey');
        }
    });
}
exports.editSurvey = editSurvey;
function getAllSurveys(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return prisma.survey.findMany({
                where: {
                    userId
                },
                include: {
                    responses: true,
                }
            });
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
            const survey = yield prisma.survey.findUnique({
                where: { id: surveyId },
                include: {
                    responses: true,
                    questions: true,
                }
            });
            if (!survey) {
                throw new HttpError_1.default(404, 'Survey not found');
            }
            return survey;
        }
        catch (error) {
            console.log(error);
            throw new HttpError_1.default(500, 'Internal server error');
        }
    });
}
exports.getSurveyById = getSurveyById;
function getSurveyBySlug(slug, surveyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const survey = yield prisma.survey.findFirst({
                where: {
                    isPublished: true,
                    status: client_1.SurveyStatus.IN_PROGRESS,
                    slug,
                    OR: [
                        { id: surveyId }
                    ],
                },
                include: {
                    responses: true,
                    questions: true,
                },
            });
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
exports.getSurveyBySlug = getSurveyBySlug;
