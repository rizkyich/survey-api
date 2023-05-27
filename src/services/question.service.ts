import { PrismaClient } from '@prisma/client';

import { QuestionWithAnalytics } from '../interfaces/question.interface';
import HttpError from '../errors/HttpError';
import { calculateQuestionAnalytics } from '../helpers/analyticsHelpers';

const prisma = new PrismaClient();

export async function getQuestionsBySurveyId(surveyId: string): Promise<QuestionWithAnalytics[]> {
  try {
    const questions = await prisma.question.findMany({ where: { surveyId } });
    const questionsWithAnalytics: QuestionWithAnalytics[] = [];

    for (const question of questions) {
      const responses = await prisma.response.findMany({
        where: { questionId: question.id },
      });

      const analytics = await calculateQuestionAnalytics(question, responses);
      questionsWithAnalytics.push({ ...question, analytics });
    }

    return questionsWithAnalytics;
  } catch (error) {
    throw new HttpError(500, 'Internal server error');
  }
}
