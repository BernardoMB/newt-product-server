import { Router } from 'express';

import { ObjectIdValidator } from './middlewares/IdValidator';

import { ProductController } from '../controllers/ProductController';
import { validateRequest } from './middlewares/RequestValidator';

const router = Router();

export class ProductRoutes {
  private _productController: ProductController;

  constructor() {
    this._productController = new ProductController();
  }

  routes(): Router {
    const controller = this._productController;
    router.get('', validateRequest, controller.retrieve);
    router.post('', validateRequest, controller.create);
    router.put('/:id', ObjectIdValidator, validateRequest, controller.update);
    router.get('/:id', ObjectIdValidator, validateRequest, controller.findById);
    router.delete(
      '/:id',
      controller.productExistsValidator,
      validateRequest,
      controller.delete
    );
    return router;
  }
}
