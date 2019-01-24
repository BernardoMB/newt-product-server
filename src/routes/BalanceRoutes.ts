import { Router } from 'express';
//Controllers
import { BalanceController } from '../controllers/BalanceController';

//Validators
import RequestValidator from './middlewares/validators/RequestValidator';

const router = Router();

export class BalanceRoutes {
  private _balanceController: BalanceController;

  constructor() {
    this._balanceController = new BalanceController();
  }

  routes(): Router {
    const controller = this._balanceController;
    router.get('', RequestValidator.validateWith([]), controller.getChannelBalance);
    router.post('/external', RequestValidator.validateWith([]), controller.getExternalBalance);
    return router;
  }
}
