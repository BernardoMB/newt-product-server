import { Router } from 'express';

import { ObjectIdValidator } from './middlewares/IdValidator';

import { ProductController } from '../controllers/ProductController';
import RequestValidator from './middlewares/RequestValidator';

const router = Router();

export class ProductRoutes {
  private _productController: ProductController;

  constructor() {
    this._productController = new ProductController();
  }

  routes(): Router {
    const controller = this._productController;
    router.get('', RequestValidator.validateWith([]), controller.retrieve);
    router.post('', RequestValidator.validateWith([]), controller.create);
    router.put(
      '/:id',
      RequestValidator.validateWith([ObjectIdValidator]),
      controller.update
    );
    router.get(
      '/:id',
      RequestValidator.validateWith([ObjectIdValidator]),
      controller.findById
    );
    router.delete(
      '/:id',
      RequestValidator.validateWith([ObjectIdValidator]),
      controller.delete
    );
    return router;
  }
}
