import { Router } from 'express';
//Controllers
import { PurchaseController } from '../controllers/PurchaseController';

//Validators
// import { ObjectIdValidator } from './middlewares/validators/IdValidator';
// import { productFieldsValidator } from './middlewares/validators/ProductValidator';
// import RequestValidator from './middlewares/validators/RequestValidator';

const router = Router();

export class PurchaseRoutes {
  private _purchaseController: PurchaseController;

  constructor() {
    this._purchaseController = new PurchaseController();
  }

  routes(): Router {
    const controller = this._purchaseController;
    //router.get('', RequestValidator.validateWith([]), controller.retrieve);
    router.post(
      '',
      controller.create
    );
    return router;
  }
}
