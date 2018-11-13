import { Request, Response, NextFunction } from 'express';
import { validationResult, param } from 'express-validator/check';
import { Types } from 'mongoose';

import { IBaseController } from './interfaces/base/BaseController';
import { IProduct } from './../models/interfaces/IProduct';
import { ProductBusiness } from '../business/ProductBusiness';

export class ProductController implements IBaseController<ProductBusiness> {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product: IProduct = <IProduct>req.body;
      const productBusiness = new ProductBusiness();
      const result: IProduct = await productBusiness.create(product);
      res.json({ product: result });
    } catch (error) {
      next({
        message: `Error creating product: ${error.message}`,
        code: 500
      });
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product: IProduct = <IProduct>req.body;
      const {
        params: { id }
      } = req;
      const productBusiness = new ProductBusiness();
      const result = await productBusiness.update(id, product);
      if (!result) {
        next({
          message: 'Error updating product: product not found',
          code: 404
        });
      } else {
        res.status(201).json({ product });
      }
    } catch (error) {
      next({
        message: `Error updating product: ${error.message}`,
        code: 500
      });
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        params: { id }
      } = req;
      const productBusiness = new ProductBusiness();
      await productBusiness.delete(id);
      res.json({ id });
    } catch (error) {
      next({
        message: `Error deleting product: ${error.message}`,
        code: 500
      });
    }
  }

  public async retrieve(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productBusiness = new ProductBusiness();
      const products: IProduct[] = await productBusiness.retrieve();
      res.json({ products });
    } catch (error) {
      next({
        message: `Error retrieving products: ${error.message}`,
        code: 500
      });
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        params: { id }
      } = req;
      const productBusiness = new ProductBusiness();
      const product = await productBusiness.findById(id);
      if (!product) {
        next({ message: 'Product not found', code: 404 });
      } else {
        res.status(201).json({ product });
      }
      res.json({ product });
    } catch (error) {
      next({ message: `Error getting product: ${error.message}`, code: 500 });
    }
  }

  public productFieldsValidator(req: Request, res: Response, next): void {}

  public productExistsValidator = param('id')
    .exists()
    .withMessage('Param id is not provided')
    .isMongoId()
    .withMessage('Specified param Id is invalid, must be ObjectId')
    .custom(async value => {
      const productBusiness = new ProductBusiness();
      if (!Types.ObjectId.isValid(value)) return true;
      if (!(await productBusiness.findById(value))) {
        throw new Error('Product with id ${value} not found in collection');
      } else {
        return true;
      }
    });
}
