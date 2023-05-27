import { Request, Response, NextFunction } from 'express';

import { loginUser, registerUser } from '../services/auth.service';
import HttpError from '../errors/HttpError';
import { tokenType } from '../configs';

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.json({
      token,
      tokenType
    });
  } catch (error) {
    console.log(error)
    if (error instanceof HttpError) {
      next(error);
    } else {
      next(new HttpError(500, 'Internal Server Error'));
    }
  }
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { username, email, password } = req.body;

  try {
    const user = await registerUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
    } else {
      next(new HttpError(500, 'Internal Server Error'));
    }
  }
}
