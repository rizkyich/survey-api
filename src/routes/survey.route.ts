import express, { Response, NextFunction } from 'express';
import {
  createSurveyController,
  getAllSurveysController,
  getSurveyByIdController,
  editSurveyController,
  getSurveyBySlugController
} from '../controllers/survey.controller';

import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authenticateToken, createSurveyController);
router.get('/', authenticateToken, getAllSurveysController);
router.get('/:slug/:surveyId', getSurveyBySlugController);
router.get('/:surveyId', getSurveyByIdController);
router.put('/:surveyId', authenticateToken, editSurveyController)

export default router;
