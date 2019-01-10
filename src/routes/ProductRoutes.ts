import { Router } from 'express';
//Controllers
import { ProductController } from '../controllers/ProductController';

//Validators
import { ObjectIdValidator } from './middlewares/validators/IdValidator';
import { ProductFieldsValidator } from './middlewares/validators/ProductValidator';
import { AuthenticationHeaderValidator } from './middlewares/validators/HeaderValidator';
import RequestValidator from './middlewares/validators/RequestValidator';

//Authentication
import { AuthenticateAdmin } from './middlewares/authenticators/AdminAuthenticator';

const router = Router();

export class ProductRoutes {
  private _productController: ProductController;

  constructor() {
    this._productController = new ProductController();
  }

  routes(): Router {
    const controller = this._productController;
    router.get('', RequestValidator.validateWith([]), controller.retrieve);
    router.post(
      '',
      RequestValidator.validateWith([...ProductFieldsValidator, AuthenticationHeaderValidator]),
      AuthenticateAdmin,
      controller.create
    );
    router.put(
      '/:id',
      RequestValidator.validateWith([ObjectIdValidator, ...ProductFieldsValidator, AuthenticationHeaderValidator]),
      AuthenticateAdmin,
      controller.update
    );
    router.get('/:id', RequestValidator.validateWith([ObjectIdValidator]), controller.findById);
    router.delete(
      '/:id',
      RequestValidator.validateWith([ObjectIdValidator, AuthenticationHeaderValidator]),
      AuthenticateAdmin,
      controller.delete
    );
    return router;
  }
}
