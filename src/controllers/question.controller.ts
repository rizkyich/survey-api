import { NextFunction, Request, Response } from 'express';

import { getQuestionsBySurveyId } from '../services/question.service';

import { QuestionWithAnalytics } from '../interfaces/question.interface';

export async function getQuestionsBySurveyIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const surveyId: string = req.params.surveyId;
    const questions: QuestionWithAnalytics[] = await getQuestionsBySurveyId(surveyId);

    res.json(questions);
  } catch (error) {
    next(error);
  }
}