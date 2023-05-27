import { Prisma, PrismaClient, Survey, Response, SurveyStatus } from '@prisma/client';

import { QuestionWithAnalytics } from '../interfaces/question.interface';

import HttpError from '../errors/HttpError';
import { calculateQuestionAnalytics } from '../helpers/analyticsHelpers';

const prisma = new PrismaClient();

export async function createSurvey(
  title: string,
  slug: string,
  description: string,
  isPublished: boolean,
  userId: string,
  status: SurveyStatus,
  questions: QuestionWithAnalytics[]
): Promise<Survey> {
  try {
    // Create the survey
    const survey = await prisma.survey.create({
      data: {
        title,
        slug,
        description,
        status,
        isPublished: questions.length ? isPublished : false,
        userId,
        questions: {
          create: questions.length ? questions.map((question) => ({
            text: question.text,
            type: question.type,
            options: question.options,
            responses: {
              create: [],
            },
          })) : [],
        },
        responses: {
          create: [],
        },
      },
      include: {
        questions: true,
      },
    });

    return survey;
  } catch (error) {
    throw new HttpError(500, 'Failed to create survey');
  }
}

function getQuestionCreateInput(question: QuestionWithAnalytics): Prisma.QuestionCreateWithoutSurveyInput {
  return {
    text: question.text,
    type: question.type,
    options: question.options,
    responses: {
      create: [],
    },
  };
}

function getQuestionUpdateInput(question: QuestionWithAnalytics): Prisma.QuestionUpdateInput {
  return {
    text: question.text,
    type: question.type,
    options: question.options,
  };
}

function getNewQuestionsCreateInput(questions: QuestionWithAnalytics[]): Prisma.QuestionCreateWithoutSurveyInput[] {
  return questions
    .filter((question) => !question.id)
    .map((question) => getQuestionCreateInput(question));
}

export async function editSurvey(
  surveyId: string,
  title: string,
  slug: string,
  description: string,
  isPublished: boolean,
  status: SurveyStatus,
  questions: QuestionWithAnalytics[]
): Promise<Survey> {
  try {
    // Prepare the question upsert operations
    const updatedSurvey = await prisma.survey.update({
      where: { id: surveyId },
      data: {
        title,
        slug,
        description,
        status,
        isPublished,
        questions: {
          upsert: questions.map((question) => ({
            where: { id: question.id ?? '' },
            create: getQuestionCreateInput(question),
            update: getQuestionUpdateInput(question),
          })),
          deleteMany: {
            id: {
              notIn: questions.filter((question) => question.id).map((question) => question.id),
            },
          },
          create: getNewQuestionsCreateInput(questions),
        },
      },
      include: {
        questions: true,
      },
    });

    return updatedSurvey;
  } catch (error) {
    console.log(error);
    throw new HttpError(500, 'Failed to edit survey');
  }
}

export async function getAllSurveys(userId: string): Promise<Survey[]> {
  try {
    return prisma.survey.findMany({
      where: {
        userId
      },
      include: {
        responses: true,
      }
    });
  } catch (error) {
    throw new HttpError(500, 'Internal server error');
  }
}

export async function getSurveyById(surveyId: string): Promise<Survey> {
  try {
    const survey = await prisma.survey.findUnique({
      where: { id: surveyId },
      include: {
        responses: true,
        questions: true,
      }
    });
    if (!survey) {
      throw new HttpError(404, 'Survey not found');
    }
    return survey;
  } catch (error) {
    console.log(error)
    throw new HttpError(500, 'Internal server error');
  }
}

export async function getSurveyBySlug(slug: string, surveyId: string): Promise<Survey> {
  try {
    const survey = await prisma.survey.findFirst({
      where: {
        isPublished: true,
        status: SurveyStatus.IN_PROGRESS,
        slug,
        OR: [
          { id: surveyId }
        ],
      },
      include: {
        responses: true,
        questions: true,
      },
    });
    if (!survey) {
      throw new HttpError(404, 'Survey not found');
    }
    return survey;
  } catch (error) {
    throw new HttpError(500, 'Internal server error');
  }
}
