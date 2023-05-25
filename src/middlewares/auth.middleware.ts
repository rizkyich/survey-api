import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtSecret } from '../configs';

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
}
