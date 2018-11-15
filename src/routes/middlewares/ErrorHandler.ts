import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const ErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = `\x1b[31m(${req.method}) ${req.originalUrl} | \x1b[31m${
    error.message
  }`;
  console.error('\x1b[31m', message);
  if (!!error.errors) console.table(error.errors);
  res.status(error.code).json({
    ...error,
    message
  });
};
