import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const ErrorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const message = `(${req.method}) ${req.originalUrl} | ${error.message}`;
  console.error(`\x1b[31m ${message}\x1b[0m`);
  if (!!error.errors) console.table(error.errors);
  res.status(error.code).json({
    ...error,
    message
  });
};
