import { Request, Response, NextFunction } from 'express';
import { handleError } from './helps/handle-error';
import { BalanceBusiness } from '../business/BalanceBusiness';
import { IBalance } from '../models/interfaces/IBalance';

export class BalanceController {
  constructor() {}

  async getExternalBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const balanceBusiness = new BalanceBusiness();
      const balance: IBalance = await balanceBusiness.getExternalBalance();
      res.json({ balance });
    } catch (error) {
      handleError(error, 'Error getting external balance', next);
    }
  }
}
