import { Request, Response, NextFunction } from 'express';

import { IBaseController } from './interfaces/base/BaseController';
import { PurchaseBusiness } from '../business/PurchaseBusiness';
import { handleError } from './helps/handle-error';

import { INewPurchase, IPurchase } from '../models/interfaces/IPurchase';

export class PurchaseController implements IBaseController<PurchaseBusiness> {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newPurchase: INewPurchase = <INewPurchase>req.body;
      const purchaseBusiness = new PurchaseBusiness();
      const purchase: IPurchase = await purchaseBusiness.create(newPurchase);
      res.json({ purchase });
    } catch (error) {
      handleError(error, 'Error creating purchase', next);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const update: IPurchase = <IPurchase>req.body;
      const {
        params: { id }
      } = req;
      const purchaseBusiness = new PurchaseBusiness();
      const purchase = await purchaseBusiness.update(id, update);
      res.status(201).json({ purchase });
    } catch (error) {
      handleError(error, ' Error updating purchase', next);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { id }
      } = req;
      const purchaseBusiness = new PurchaseBusiness();
      await purchaseBusiness.delete(id);
      res.json({ id });
    } catch (error) {
      handleError(error, ' Error deleting purchase', next);
    }
  }

  public async retrieve(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const purchaseBusiness = new PurchaseBusiness();
      const purchases: IPurchase[] = await purchaseBusiness.retrieve();
      res.json({ purchases });
    } catch (error) {
      handleError(error, 'Error retrieving purchases', next);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { id }
      } = req;
      const purchaseBusiness = new PurchaseBusiness();
      const purchase = await purchaseBusiness.findById(id);
      res.json({ purchase });
    } catch (error) {
      handleError(error, 'Error finding purchase', next);
    }
  }

  public async findByExternalId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { externalId }
      } = req;
      const purchaseBusiness = new PurchaseBusiness();
      const purchase = await purchaseBusiness.findByExternalId(externalId);
      res.json({ purchase });
    } catch (error) {
      handleError(error, 'Error finding purchase', next);
    }
  }

  public async retrieveByClientId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { id }
      } = req;
      const productBusiness = new PurchaseBusiness();
      const purchases: IPurchase[] = await productBusiness.retrieveByClientId(id);
      res.json({ purchases });
    } catch (error) {
      handleError(error, 'Error retrieving purchases', next);
    }
  }
}
