import { NextFunction } from 'express';

export function handleError(error, message: string, next: NextFunction) {
    next({
      message: `${message}: ${error.message}`,
      code: !!error.code ? error.code : 500
    });
  }
  