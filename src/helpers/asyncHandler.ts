import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";
import { catchSQLError } from "./catchError";

type ApiResponse<T = any> = {
  message: string
  status: number
  data?: T
}

type ExpressAsyncFunction<T = any> = (req: Request, res: Response, next: NextFunction) => Promise<T>;

export default function asyncHandler<T = any>(asyncFunction: ExpressAsyncFunction<ApiResponse<T> | void>): ExpressAsyncFunction<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await asyncFunction(req, res, next);
      if (result && 'status' in result && 'message' in result) {
        const { status, message, data } = result
        res.status(status).json({ message, ...(data ? { data } : {}) })
      }
    } catch (error) {
      const errorMessage = catchSQLError(error)
      next(new HttpException(400, errorMessage))
    }
  }
}
