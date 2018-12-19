import { Document } from 'mongoose';

import { credentials } from '../secrets';

import { IPurchase, INewPurchase, IPurchaseStatus, IPurchaseInfo } from '../models/interfaces/IPurchase';
import { IProduct } from '../models/interfaces/IProduct';
import { PurchaseStatus } from '../models/enums/PurchaseStatus';
import { ICredentials } from '../models/interfaces/ICredentials';

import { PurchaseRepository } from '../repository/PurchaseRepository';
import { IPurchaseBusiness } from './interfaces/IPurchaseBusiness';
import { ProductRepository } from '../repository/ProductRepository';
import { doSale } from '../services/SaleService';

export class PurchaseBusiness implements IPurchaseBusiness {
  private _purchaseRepository: PurchaseRepository;
  private _productRepository: ProductRepository;
  private _credentials: ICredentials;

  constructor() {
    this._purchaseRepository = new PurchaseRepository();
    this._productRepository = new ProductRepository();
    this._credentials = credentials;
  }

  async retrieve(): Promise<IPurchase[]> {
    return await (<Promise<IPurchase[]>>this._purchaseRepository.retrieve());
  }

  async retrieveByClientId(user: string): Promise<IPurchase[]> {
    return <IPurchase[]>await this._purchaseRepository.find({ user });
  }

  async findById(_id: string): Promise<IPurchase> {
    const res = <IPurchase>await this._purchaseRepository.findById(_id);
    this.throwIfNotExists(res);
    return res;
  }

  async findByExternalId(externalId: string): Promise<IPurchase> {
    const res = <IPurchase>await this._purchaseRepository.findOne({ externalId });
    this.throwIfNotExists(res);
    return res;
  }

  async create(item: INewPurchase): Promise<IPurchase> {
    const p = <IPurchase>this._mapNewPurchaseToPurchase(item);
    const product = <IProduct>await this._productRepository.findOne({ code: item.productId });
    if (!product)
      throw {
        message: `Product ${item.productId} for purchase not found`,
        code: 404
      };
    if (product.amounts.length > 0 && product.amounts.filter(amount => amount.amount === item.amount).length === 0)
      throw {
        message: `Specified amount: ${item.amount} for purchase not supported by product ${item.productId}`,
        code: 400
      };
    let purchase = <IPurchase>await this._purchaseRepository.create(p);
    const purchaseInfo: IPurchaseInfo = {
      id: purchase.externalId,
      destination: parseInt(purchase.destination),
      productId: product.code,
      terminalNo: '0',
      amount: purchase.amount,
      extra: !!purchase.extra ? purchase.extra : undefined
    };
    try {
      const response = await doSale(this._credentials, purchaseInfo);
      console.log(response);
      purchase = await this.updateStatus(purchase.id, {
        updatedAt: new Date(),
        code: PurchaseStatus.Approved,
        message: `PURCHASE_SUCCEEDED`
      });
    } catch (e) {
      purchase = await this.updateStatus(purchase.id, {
        updatedAt: new Date(),
        code: PurchaseStatus.Failed,
        message: `PURCHASE_FAILED: ${e.message}`
      });
      throw { message: `Purchase operation failed: ${e.message}`, code: 500 };
    } finally {
      return purchase;
    }
  }

  async update(_id: string, item: IPurchase): Promise<IPurchase> {
    const res = await this._purchaseRepository.findById(_id);
    this.throwIfNotExists(res);
    return await (<Promise<IPurchase>>this._purchaseRepository.update(<any>res._id, item));
  }

  async updateStatus(_id: string, status: IPurchaseStatus): Promise<IPurchase> {
    return await (<Promise<IPurchase>>this._purchaseRepository.updateStatus(_id, status));
  }

  async delete(_id: string): Promise<boolean> {
    this.throwIfNotExists(await this._purchaseRepository.delete(_id));
    return true;
  }

  private _mapNewPurchaseToPurchase(np: INewPurchase): Partial<IPurchase> {
    return {
      product: np.productId,
      user: np.user,
      destination: np.destination,
      amount: np.amount,
      comment: np.comment,
      statusLog: [
        {
          updatedAt: new Date(),
          code: PurchaseStatus.Pending,
          message: 'INIT_PURCHASE'
        }
      ]
    };
  }

  private throwIfNotExists(item: Document) {
    if (!item) throw { message: 'Purchase item not found', code: 404 };
  }
}