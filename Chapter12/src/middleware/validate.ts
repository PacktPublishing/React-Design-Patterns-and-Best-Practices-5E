import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { sendError } from '../utils/responses.js';

export const validate = (schema?: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!schema) {
      return next();
    }

    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      const messages = error?.errors
        ?.map((issue: any) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ');

      sendError(res, `Validation failed: ${messages ?? 'Unknown error'}`, 400);
    }
  };
};
