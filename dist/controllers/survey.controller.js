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
exports.getSurveyBySlugController = exports.getSurveyByIdController = exports.getAllSurveysController = exports.editSurveyController = exports.createSurveyController = void 0;
const survey_service_1 = require("../services/survey.service");
function createSurveyController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, slug, description, status, isPublished, questions } = req.body;
            // @ts-ignore
            const { userId } = req.user;
            const survey = yield (0, survey_service_1.createSurvey)(title, slug, description, !!isPublished, userId, status, questions !== null && questions !== void 0 ? questions : []);
            res.status(201).json(survey);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createSurveyController = createSurveyController;
function editSurveyController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const surveyId = req.params.surveyId;
            const { title, slug, description, status, isPublished, questions } = req.body;
            console.log(surveyId);
            const updatedSurvey = yield (0, survey_service_1.editSurvey)(surveyId, title, slug, description, !!isPublished, status, questions !== null && questions !== void 0 ? questions : []);
            res.json(updatedSurvey);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.editSurveyController = editSurveyController;
function getAllSurveysController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const { userId } = req.user;
        try {
            const surveys = yield (0, survey_service_1.getAllSurveys)(userId);
            res.json(surveys);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllSurveysController = getAllSurveysController;
function getSurveyByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const surveyId = req.params.surveyId;
            const survey = yield (0, survey_service_1.getSurveyById)(surveyId);
            res.json(survey);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getSurveyByIdController = getSurveyByIdController;
function getSurveyBySlugController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const slug = req.params.slug;
        const surveyId = req.params.surveyId;
        try {
            const survey = yield (0, survey_service_1.getSurveyBySlug)(slug, surveyId);
            res.json(survey);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getSurveyBySlugController = getSurveyBySlugController;
