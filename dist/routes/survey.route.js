"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const survey_controller_1 = require("../controllers/survey.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post('/', auth_middleware_1.authenticateToken, survey_controller_1.createSurveyController);
router.get('/', auth_middleware_1.authenticateToken, survey_controller_1.getAllSurveysController);
router.get('/:slug/:surveyId', survey_controller_1.getSurveyBySlugController);
router.get('/:surveyId', survey_controller_1.getSurveyByIdController);
router.put('/:surveyId', auth_middleware_1.authenticateToken, survey_controller_1.editSurveyController);
exports.default = router;
