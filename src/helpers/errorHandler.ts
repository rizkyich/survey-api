import { Request, Response, NextFunction } from 'express';

import HttpError from "../errors/HttpError"

interface ErrorResponse {
  error: string;
  statusCode: number;
}

export function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Internal Server Error';

  const errorResponse: ErrorResponse = {
    error: errorMessage,
    statusCode: statusCode,
  };

  res.status(statusCode).json(errorResponse);
}

export default errorHandler;