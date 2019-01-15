import { Router } from 'express';
//Controllers
import { PurchaseController } from '../controllers/PurchaseController';

//Validators
import { ObjectIdValidator } from './middlewares/validators/IdValidator';
import { AuthenticationHeaderValidator } from './middlewares/validators/HeaderValidator';
import { newPurchaseFieldsValidator, externalIdValidator } from './middlewares/validators/PurchaseValidator';
import RequestValidator from './middlewares/validators/RequestValidator';

//Authentication
import { AuthenticatePurchase, AuthenticateGetUserPurchases } from './middlewares/authenticators/PurchaseAuthenticator';

const router = Router();

export class PurchaseRoutes {
  private _purchaseController: PurchaseController;

  constructor() {
    this._purchaseController = new PurchaseController();
  }

  routes(): Router {
    const controller = this._purchaseController;
    router.post(
      '',
      RequestValidator.validateWith([AuthenticationHeaderValidator, ...newPurchaseFieldsValidator]),
      AuthenticatePurchase,
      controller.create
    );
    router.get(
      '/user/:id',
      RequestValidator.validateWith([ObjectIdValidator, AuthenticationHeaderValidator]),
      AuthenticateGetUserPurchases,
      controller.retrieveByClientId
    );
    router.get(
      '/externalId/:externalId',
      RequestValidator.validateWith([externalIdValidator]),
      controller.findByExternalId
    );
    router.get('/:id', RequestValidator.validateWith([ObjectIdValidator]), controller.findById);
    return router;
  }
}
