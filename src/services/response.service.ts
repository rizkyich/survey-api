import { PrismaClient, Response } from '@prisma/client';

import HttpError from '../errors/HttpError';

const prisma = new PrismaClient();

export async function saveAnswer(
  respondentName: string,
  responseValue: string | string[],
  surveyId: string,
  questionId: string
): Promise<Response> {
  const survey = await prisma.survey.findUnique({ where: { id: surveyId } });
  if (!survey) {
    throw new HttpError(404, 'Survey Id not found');
  }

  const question = await prisma.question.findUnique({ where: { id: questionId } });
  if (!question) {
    throw new HttpError(404, 'Question Id not found');
  }

  const createdResponse = await prisma.response.create({
    data: {
      respondentName,
      responseValue: JSON.stringify(Array.isArray(responseValue) ? responseValue : [responseValue]),
      surveyId,
      questionId,
    },
  });

  return createdResponse;
}

export async function saveBulkAnswers(responses: {
  respondentName: string;
  responseValue: any | any[];
  surveyId: string;
  questionId: string;
}[]): Promise<Response[]> {
  const savedResponses: Response[] = [];

  for (const response of responses) {
    const savedResponse = await saveAnswer(
      response.respondentName,
      response.responseValue,
      response.surveyId,
      response.questionId
    );
    savedResponses.push(savedResponse);
  }

  return savedResponses;
}