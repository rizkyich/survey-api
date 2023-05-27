"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const question_controller_1 = require("../controllers/question.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
router.get('/:surveyId', auth_middleware_1.authenticateToken, question_controller_1.getQuestionsBySurveyIdController);
exports.default = router;
