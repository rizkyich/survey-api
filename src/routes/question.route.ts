import express, { Router } from 'express';

const router: Router = express.Router();

import { getQuestionsBySurveyIdController } from '../controllers/question.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

router.get('/:surveyId', authenticateToken, getQuestionsBySurveyIdController);

export default router;
