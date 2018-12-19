import { Router } from 'express';
//Controllers
import { ProductController } from '../controllers/ProductController';

//Validators
import { ObjectIdValidator } from './middlewares/validators/IdValidator';
import { productFieldsValidator } from './middlewares/validators/ProductValidator';
import RequestValidator from './middlewares/validators/RequestValidator';

const router = Router();

export class ProductRoutes {
  private _productController: ProductController;

  constructor() {
    this._productController = new ProductController();
  }

  routes(): Router {
    const controller = this._productController;
    router.get('', RequestValidator.validateWith([]), controller.retrieve);
    router.post('', RequestValidator.validateWith(productFieldsValidator), controller.create);
    router.put(
      '/:id',
      RequestValidator.validateWith([ObjectIdValidator, ...productFieldsValidator]),
      controller.update
    );
    router.get('/:id', RequestValidator.validateWith([ObjectIdValidator]), controller.findById);
    router.delete('/:id', RequestValidator.validateWith([ObjectIdValidator]), controller.delete);
    return router;
  }
}
