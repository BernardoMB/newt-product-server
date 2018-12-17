import { IPurchase, INewPurchase } from '../models/interfaces/IPurchase';
import { PurchaseRepository } from '../repository/PurchaseRepository';
import { IPurchaseBusiness } from './interfaces/IPurchaseBusiness';
import { PurchaseStatus } from '../models/enums/PurchaseStatus';
import { Document } from 'mongoose';

export class PurchaseBusiness implements IPurchaseBusiness {
  private _purchaseRepository: PurchaseRepository;

  constructor() {
    this._purchaseRepository = new PurchaseRepository();
  }

  async retrieve(): Promise<IPurchase[]> {
    return await (<Promise<IPurchase[]>>this._purchaseRepository.retrieve());
  }

  async findById(_id: string): Promise<IPurchase> {
    const res = <IPurchase>await this._purchaseRepository.findById(_id);
    this.throwIfNotExists(res);
    return res;
  }

  async create(item: INewPurchase): Promise<IPurchase> {
    const p = <IPurchase>this.mapNewPurchaseToPurchase(item);
    return await (<Promise<IPurchase>>this._purchaseRepository.create(p));
  }

  async update(_id: string, item: IPurchase): Promise<IPurchase> {
    const res = await this._purchaseRepository.findById(_id);
    this.throwIfNotExists(res);
    return await (<Promise<IPurchase>>(
      this._purchaseRepository.update(<any>res._id, item)
    ));
  }

  async delete(_id: string): Promise<boolean> {
    this.throwIfNotExists(await this._purchaseRepository.delete(_id));
    return true;
    //return await this._productRepository.delete(_id);
  }

  mapNewPurchaseToPurchase(np: INewPurchase) : Partial<IPurchase> {
      return {
          product: np.productId,
          user: np.user,
          destination: np.destination,
          amount: np.amount,
          comment: np.comment,
          status: PurchaseStatus.Pending,
          statusLog : [{updatedAt: new Date(), code : 0, message : "Todo chido"}]
      }
  }

  private throwIfNotExists(item: Document) {
    if (!item) throw { message: 'Product not found', code: 404 };
  }
}
