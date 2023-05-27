import { Question } from "@prisma/client";

export type QuestionWithAnalytics = Question & {
  analytics: any;
};
