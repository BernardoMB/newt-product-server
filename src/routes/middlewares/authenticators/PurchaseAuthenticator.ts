import { Request, Response, NextFunction } from 'express';
import { verify, TokenExpiredError } from 'jsonwebtoken';

import { environment } from '../../../environment';
import { INewPurchase } from '../../../models/interfaces/IPurchase';
const JWT_HASH = environment.jwtHash;

export function AuthenticatePurchase(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization');
    const newPurchase: INewPurchase = <INewPurchase>req.body;
    const decoded = verify(token, JWT_HASH);
    if (newPurchase.user !== decoded) {
      return next({
        message: `Invalid request: User is not authenticated`,
        code: 401
      });
    }
    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return next({
        message: `Authentication failed: the token has expired, try logging in again.`,
        code: 401
      });
    }
    return next({
      message: `Authentication failed: ${err.message}`,
      code: 401
    });
  }
}

export function AuthenticateGetUserPurchases(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization');
    const {
      params: { id }
    } = req;
    const decoded = verify(token, JWT_HASH);
    if (id !== decoded) {
      return next({
        message: `Invalid request: User is not authenticated`,
        code: 401
      });
    }
    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return next({
        message: `Authentication failed: the token has expired, try logging in again.`,
        code: 401
      });
    }
    return next({
      message: `Authentication failed: ${err.message}`,
      code: 401
    });
  }
}
