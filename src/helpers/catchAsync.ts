import { NextFunction, Response } from "express";
import { HTTP } from "./HttpRequest";

export const catchAsync = <T>(fn: (req: HTTP.Req) => Promise<{ status: number; message: string; data?: T }>) => {
  return async (req: HTTP.Req, res: HTTP.Res<T>, next: NextFunction) => {
    try {
      const { status, message, data } = await fn(req);
      res.status(status).json({ message, data });
    } catch (error) {
      next(error);
    }
  }
}
