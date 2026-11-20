import type { Response } from 'express';

/** Errors use the same shape as successful responses, so the frontend handles both the same way. */
export function sendError(res: Response, status: number, message: string): void {
  res.status(status).json({ success: false, response_code: status, message, data: [] });
}
