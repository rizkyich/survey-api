// @ts-nocheck
import { Question, Response } from '@prisma/client';
import { QuestionTypeEnum } from '../interfaces/common.interface';

export function countOccurrences(arr: any[]): { [key: string]: number } {
  return arr.reduce((counts: { [key: string]: number }, val: any) => {
    const key = String(val);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

export function calculateAverage(arr: number[]): number {
  const sum = arr.reduce((total, val) => total + val, 0);
  return arr.length > 0 ? sum / arr.length : 0;
}

export async function calculateQuestionAnalytics(question: Question, responses: Response[]) {
  switch (question.type) {
    case QuestionTypeEnum.Radio:
      const responseCounts = countOccurrences(responses.map((response) => response.responseValue));
      return {
        questionId: question.id,
        totalResponses: responses.length,
        responseCounts,
      };
    case QuestionTypeEnum.RatingScale:
      const ratingValues = responses.map((response) => {
        const value = JSON.parse(response.responseValue ?? 'null');
        if (Array.isArray(value)) {
          return value.map((v: any) => Number(v));
        } else {
          return Number(value);
        }
      });
      const flattenedRatings = ratingValues.flat();
      const averageRating = calculateAverage(flattenedRatings);
      return {
        questionId: question.id,
        totalResponses: responses.length,
        averageRating,
      };
    case QuestionTypeEnum.TextInput:
      const textResponses = responses.map((response) => response.responseValue);
      return {
        questionId: question.id,
        totalResponses: responses.length,
        responses: textResponses,
      };
    case QuestionTypeEnum.Checkbox:
    case QuestionTypeEnum.DropdownSelect:
      const optionCounts: { [key: string]: number } = {};
      responses.forEach((response) => {
        const values = JSON.parse(response.responseValue ?? 'null');
        if (Array.isArray(values)) {
          values.forEach((value: any) => {
            const key = String(value);
            optionCounts[key] = (optionCounts[key] || 0) + 1;
          });
        } else {
          const key = String(values);
          optionCounts[key] = (optionCounts[key] || 0) + 1;
        }
      });
      return {
        questionId: question.id,
        totalResponses: responses.length,
        optionCounts,
      };
    default:
      throw new Error('Invalid question type');
  }
}
