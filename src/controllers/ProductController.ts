import { Request, Response, NextFunction } from 'express';

import { IBaseController } from './interfaces/base/BaseController';
import { IProduct } from './../models/interfaces/IProduct';
import { ProductBusiness } from '../business/ProductBusiness';
import { handleError } from './helps/handle-error';

export class ProductController implements IBaseController<ProductBusiness> {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product: IProduct = <IProduct>req.body;
      const productBusiness = new ProductBusiness();
      const result: IProduct = await productBusiness.create(product);
      res.json({ product: result });
    } catch (error) {
      handleError(error, 'Error creating product', next);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const update: IProduct = <IProduct>req.body;
      const {
        params: { id }
      } = req;
      const productBusiness = new ProductBusiness();
      const product = await productBusiness.update(id, update);
      res.status(201).json({ product });
    } catch (error) {
      handleError(error, ' Error updating product', next);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { id }
      } = req;
      const productBusiness = new ProductBusiness();
      await productBusiness.delete(id);
      res.json({ id });
    } catch (error) {
      handleError(error, ' Error deleting product', next);
    }
  }

  public async retrieve(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productBusiness = new ProductBusiness();
      const products: IProduct[] = await productBusiness.retrieve();
      res.json({ products });
    } catch (error) {
      handleError(error, 'Error retrieving products', next);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { id }
      } = req;
      const productBusiness = new ProductBusiness();
      const product = await productBusiness.findById(id);
      res.json({ product });
    } catch (error) {
      handleError(error, 'Error finding product', next);
    }
  }
}
