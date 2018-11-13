import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const ErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = `(${req.method}) ${req.originalUrl} | ${error.message}`;
  console.error(message);
  if (!!error.errors) console.table(error.errors);
  res.status(error.code).json({
    ...error,
    message
  });
};
