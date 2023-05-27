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
exports.getQuestionsBySurveyIdController = void 0;
const question_service_1 = require("../services/question.service");
function getQuestionsBySurveyIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const surveyId = req.params.surveyId;
            const questions = yield (0, question_service_1.getQuestionsBySurveyId)(surveyId);
            res.json(questions);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getQuestionsBySurveyIdController = getQuestionsBySurveyIdController;
