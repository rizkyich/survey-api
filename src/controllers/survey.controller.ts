import { Request, Response, NextFunction } from 'express';
import { Survey, Response as ResponsePrisma } from '@prisma/client';

import {
  createSurvey,
  editSurvey,
  getAllSurveys,
  getSurveyById,
  getSurveyBySlug,
} from '../services/survey.service';

import { RequestAuth } from '../interfaces/common.interface';

export async function createSurveyController(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, slug, description, status, isPublished, questions } = req.body;
    // @ts-ignore
    const { userId } = req.user as RequestAuth;

    const survey: Survey = await createSurvey(
      title,
      slug,
      description,
      !!isPublished,
      userId,
      status,
      questions ?? []
    );
    res.status(201).json(survey);
  } catch (error) {
    next(error);
  }
}

export async function editSurveyController(req: Request, res: Response, next: NextFunction) {
  try {
    const surveyId: string = req.params.surveyId;
    const { title, slug, description, status, isPublished, questions } = req.body;

    console.log(surveyId)

    const updatedSurvey: Survey = await editSurvey(
      surveyId,
      title,
      slug,
      description,
      !!isPublished,
      status,
      questions ?? []
    );
    res.json(updatedSurvey);
  } catch (error) {
    next(error);
  }
}

export async function getAllSurveysController(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const { userId } = req.user as RequestAuth;

  try {
    const surveys: Survey[] = await getAllSurveys(userId);

    res.json(surveys);
  } catch (error) {
    next(error);
  }
}

export async function getSurveyByIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const surveyId: string = req.params.surveyId;
    const survey: Survey = await getSurveyById(surveyId);

    res.json(survey);
  } catch (error) {
    next(error);
  }
}

export async function getSurveyBySlugController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const slug = req.params.slug;
  const surveyId = req.params.surveyId;

  try {
    const survey = await getSurveyBySlug(slug, surveyId);
    res.json(survey);
  } catch (error) {
    next(error)
  }
}
