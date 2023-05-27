import { NextFunction, Request, Response } from 'express';
import { saveAnswer, saveBulkAnswers } from '../services/response.service';

import HttpError from '../errors/HttpError';

export async function saveResponseController(req: Request, res: Response): Promise<void> {
  try {
    const { respondentName, responseValue, surveyId, questionId } = req.body;

    const response = await saveAnswer(respondentName, responseValue, surveyId, questionId);

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export async function saveBulkResponsesController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { responses } = req.body;

    // Ensure that the 'responses' field is provided in the request body
    if (!responses || !Array.isArray(responses)) {
      throw new HttpError(400, 'Invalid data format');
    }

    // Save bulk responses
    const savedResponses = await saveBulkAnswers(responses);

    res.status(200).json({ savedResponses });
  } catch (error) {
    next(error)
  }
}
