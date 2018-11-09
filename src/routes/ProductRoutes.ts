import { Router } from "express";

import { ProductController } from "../controllers/ProductController";

const router = Router();

export class ProductRoutes {
  private _productController: ProductController;

  constructor() {
    this._productController = new ProductController();
  }

  get routes(): Router {
    const controller = this._productController;
    router.get("", controller.retrieve);
    router.post("", controller.create);
    router.put("/:id", controller.update);
    router.get("/:id", controller.findById);
    router.delete("/:id", controller.delete);
    return router;
  }
}
