import { PrismaClient, Question, Response } from '@prisma/client';

import { QuestionType } from '../interfaces/common.interface';
import { countOccurrences, calculateAverage } from '../helpers/analyticsHelpers';

const prisma = new PrismaClient();

type QuestionResponseType = Question & {
  responses: Response[];
}

export async function getQuestionAnalytics(questionId: string) {
  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { responses: true },
    });

    if (!question) {
      throw new Error('Question not found');
    }

    switch (question.type) {
      case QuestionType.MultipleChoice:
        return getMultipleChoiceQuestionAnalytics(question);
      case QuestionType.RatingScale:
        return getRatingScaleQuestionAnalytics(question);
      case QuestionType.TextInput:
        return getTextInputQuestionAnalytics(question);
      case QuestionType.Checkbox:
        return getCheckboxQuestionAnalytics(question);
      case QuestionType.DropdownSelect:
        return getDropdownSelectQuestionAnalytics(question);
      default:
        throw new Error('Invalid question type');
    }
  } catch (error) {
    throw new Error('Failed to retrieve question analytics');
  }
}

async function getMultipleChoiceQuestionAnalytics(question: QuestionResponseType) {
  const totalResponses = question.responses.length;
  const responseCounts = countOccurrences(question.responses.map((response) => response.responseValue));

  return {
    questionId: question.id,
    totalResponses,
    responseCounts,
  };
}

async function getRatingScaleQuestionAnalytics(question: QuestionResponseType) {
  const totalResponses = question.responses.length;
  const ratingValues = question.responses.map((response) => Number(response.responseValue));
  const averageRating = calculateAverage(ratingValues);

  return {
    questionId: question.id,
    totalResponses,
    averageRating,
  };
}

async function getTextInputQuestionAnalytics(question: QuestionResponseType) {
  const totalResponses = question.responses.length;
  const responses = question.responses.map((response) => response.responseValue);

  return {
    questionId: question.id,
    totalResponses,
    responses,
  };
}

async function getCheckboxQuestionAnalytics(question: QuestionResponseType) {
  const totalResponses = question.responses.length;
  const selectedOptions = question.responses.flatMap((response) => response.responseValue.split(','));
  const optionCounts = countOccurrences(selectedOptions);

  return {
    questionId: question.id,
    totalResponses,
    optionCounts,
  };
}

async function getDropdownSelectQuestionAnalytics(question: QuestionResponseType) {
  const totalResponses = question.responses.length;
  const responseValues = question.responses.map((response) => response.responseValue);
  const optionCounts = countOccurrences(responseValues);

  return {
    questionId: question.id,
    totalResponses,
    optionCounts,
  };
}