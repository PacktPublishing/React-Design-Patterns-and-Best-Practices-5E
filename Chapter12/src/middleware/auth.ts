import type { NextFunction, Request, Response } from 'express';
import { sendError } from '../utils/responses.js';

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      sendError(res, 'Authentication required', 401);
      return;
    }

    const userId = extractUserIdFromToken(token);

    if (!userId) {
      sendError(res, 'Invalid token', 401);
      return;
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.error(error);
    sendError(res, 'Authentication failed', 401);
  }
};

const extractUserIdFromToken = (token: string): number | null => {
  const parsed = Number(token);
  return Number.isInteger(parsed) ? parsed : null;
};
