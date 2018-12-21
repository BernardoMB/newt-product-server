import { Request, Response, NextFunction } from 'express';
import { handleError } from './helps/handle-error';
import { BalanceBusiness } from '../business/BalanceBusiness';
import { IBalance } from '../models/interfaces/IBalance';

export class BalanceController {
  constructor() {}

  /**
   * @api {get} /api/balance GET
   * @apiName GetExternalBalance
   * @apiGroup Balance
   *
   * @apiDescription Gets the external balance for the channel (Newt) in the third party account (NewVision).
   *
   * @apiSuccess (200) {Object} balance       The current balance, limit, and date of the request.
   */
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
