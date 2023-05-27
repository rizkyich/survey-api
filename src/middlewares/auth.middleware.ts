import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import HttpError from '../errors/HttpError';
import { jwtSecret, tokenType } from '../configs';

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [authType, authToken] = authHeader.split(' '); 
    
    if (authType === tokenType && authToken) {

      try {
        const decoded = jwt.verify(authToken, jwtSecret) as JwtPayload;
        req.user = { userId: decoded.userId };
        next();
        return;
      } catch (error) {
        return res.sendStatus(403);
      }

    }
  }

  next(new HttpError(401, 'Unauthorized'));
}