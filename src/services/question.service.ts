import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllQuestions(surveyId: string) {
  return prisma.question.findMany({
    where: {
      surveyId,
    },
  });
}

export async function getQuestionById(id: string) {
  return prisma.question.findUnique({
    where: {
      id,
    },
  });
}

export async function createQuestion(surveyId: string, data: any) {
  return prisma.question.create({
    data: {
      ...data,
      surveyId,
    },
  });
}

export async function updateQuestion(id: string, data: any) {
  return prisma.question.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteQuestion(id: string) {
  return prisma.question.delete({
    where: {
      id,
    },
  });
}
