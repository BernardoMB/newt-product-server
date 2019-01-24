import { Request, Response, NextFunction } from 'express';

import { handleError } from './helps/handle-error';
import { BalanceBusiness } from '../business/BalanceBusiness';

import { IBalance } from '../models/interfaces/IBalance';
import { IPurchaseRequest } from '../models/interfaces/IServiceRequest';

export class BalanceController {
  async getChannelBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const balanceBusiness = new BalanceBusiness();
      const balance: IBalance = await balanceBusiness.getChannelBalance();
      res.json({ balance });
    } catch (error) {
      handleError(error, 'Error getting channel balance', next);
    }
  }

  async getExternalBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const purchaseRequest: IPurchaseRequest = req.body;
      const balanceBusiness = new BalanceBusiness();
      const balance = await balanceBusiness.getExternalBalance(purchaseRequest);
      res.json({ balance });
    } catch (error) {
      handleError(error, 'Error getting external balance', next);
    }
  }
}
