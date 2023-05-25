import { PrismaClient, Survey, Question, Response } from '@prisma/client';
import HttpError from '../errors/HttpError';

const prisma = new PrismaClient();

export async function getAllSurveys(): Promise<Survey[]> {
  try {
    return prisma.survey.findMany();
  } catch (error) {
    throw new HttpError(500, 'Internal server error');
  }
}

export async function getSurveyById(surveyId: string): Promise<Survey> {
  try {
    const survey = await prisma.survey.findUnique({ where: { id: surveyId } });
    if (!survey) {
      throw new HttpError(404, 'Survey not found');
    }
    return survey;
  } catch (error) {
    throw new HttpError(500, 'Internal server error');
  }
}

export async function getQuestionsBySurveyId(surveyId: string): Promise<Question[]> {
  try {
    return prisma.question.findMany({ where: { surveyId } });
  } catch (error) {
    throw new HttpError(500, 'Internal server error');
  }
}

export async function getResponsesBySurveyId(surveyId: string): Promise<Response[]> {
  try {
    return prisma.response.findMany({ where: { surveyId } });
  } catch (error) {
    throw new HttpError(500, 'Internal server error');
  }
}
