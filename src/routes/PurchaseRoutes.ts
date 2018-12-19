import { Router } from 'express';
//Controllers
import { PurchaseController } from '../controllers/PurchaseController';

//Validators
import { ObjectIdValidator } from './middlewares/validators/IdValidator';
import { newPurchaseFieldsValidator, externalIdValidator } from './middlewares/validators/PurchaseValidator';
import RequestValidator from './middlewares/validators/RequestValidator';

const router = Router();

export class PurchaseRoutes {
  private _purchaseController: PurchaseController;

  constructor() {
    this._purchaseController = new PurchaseController();
  }

  routes(): Router {
    const controller = this._purchaseController;
    //router.get('', RequestValidator.validateWith([]), controller.retrieve);
    router.post('', RequestValidator.validateWith(newPurchaseFieldsValidator), controller.create);
    router.get('/user/:id', RequestValidator.validateWith([ObjectIdValidator]), controller.retrieveByClientId);
    router.get(
      '/externalId/:externalId',
      RequestValidator.validateWith([externalIdValidator]),
      controller.findByExternalId
    );
    router.get('/:id', RequestValidator.validateWith([ObjectIdValidator]), controller.findById);
    return router;
  }
}
