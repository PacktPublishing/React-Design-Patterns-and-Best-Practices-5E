import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode = 200,
  meta?: ApiResponse['meta']
): Response => {
  return res.status(statusCode).json({
    success: true,
    data,
    ...(meta && { meta })
  } satisfies ApiResponse<T>);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 400
): Response => {
  return res.status(statusCode).json({
    success: false,
    error: message
  } satisfies ApiResponse);
};

export const sendNotFound = (
  res: Response,
  resource = 'Resource'
): Response => {
  return sendError(res, `${resource} not found`, 404);
};
