import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import HttpError from '../errors/HttpError';

// Prisma client instance
const prisma = new PrismaClient();

// Secret key for JWT
const jwtSecret = 'your-secret-key';

export async function registerUser(username: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
}

export async function loginUser(email: string, password: string): Promise<string> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new HttpError(401, 'Invalid credentials');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new HttpError(401, 'Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id }, jwtSecret);
  return token;
}
