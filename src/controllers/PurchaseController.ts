import { Request, Response, NextFunction } from 'express';
import { handleError } from './helps/handle-error';
import { INewPurchase, IPurchase } from '../models/interfaces/IPurchase';
import { PurchaseBusiness } from '../business/PurchaseBusiness';

export class PurchaseController  {
    
    public async create(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        const newPurchase: INewPurchase = <INewPurchase>req.body;
        const purchaseBusiness = new PurchaseBusiness();        
        const result: IPurchase = await purchaseBusiness.create(newPurchase);
        res.json({ product: result });
      } catch (error) {
        handleError(error, 'Error creating purchase', next);
      }
    }
  
    // public async update(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const update: IProduct = <IProduct>req.body;
    //     const {
    //       params: { id }
    //     } = req;
    //     const productBusiness = new ProductBusiness();
    //     const product = await productBusiness.update(id, update);
    //     res.status(201).json({ product });
    //   } catch (error) {
    //     handleError(error, ' Error updating purchase', next);
    //   }
    // }
  
    // public async delete(
    //   req: Request,
    //   res: Response,
    //   next: NextFunction
    // ): Promise<void> {
    //   try {
    //     const {
    //       params: { id }
    //     } = req;
    //     const productBusiness = new ProductBusiness();
    //     await productBusiness.delete(id);
    //     res.json({ id });
    //   } catch (error) {
    //     handleError(error, ' Error deleting product', next);
    //   }
    // }
  
    // public async retrieveByClientId(
    //   req: Request,
    //   res: Response,
    //   next: NextFunction
    // ): Promise<void> {
    //   try {
    //     const productBusiness = new ProductBusiness();
    //     const products: IProduct[] = await productBusiness.retrieve();
    //     res.json({ products });
    //   } catch (error) {
    //     handleError(error, 'Error retrieving products', next);
    //   }
    // }
  
    // public async findById(
    //   req: Request,
    //   res: Response,
    //   next: NextFunction
    // ): Promise<void> {
    //   try {
    //     const {
    //       params: { id }
    //     } = req;
    //     const productBusiness = new ProductBusiness();
    //     const product = await productBusiness.findById(id);
    //     res.json({ product });
    //   } catch (error) {
    //     handleError(error, 'Error finding product', next);
    //   }
    // }
  }