import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllResponses(surveyId: string) {
  return prisma.response.findMany({
    where: {
      surveyId,
    },
  });
}

export async function getResponseById(id: string) {
  return prisma.response.findUnique({
    where: {
      id,
    },
  });
}

export async function createResponse(surveyId: string, data: any) {
  return prisma.response.create({
    data: {
      ...data,
      surveyId,
    },
  });
}

export async function updateResponse(id: string, data: any) {
  return prisma.response.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteResponse(id: string) {
  return prisma.response.delete({
    where: {
      id,
    },
  });
}
