import { INewPurchase, IPurchase, IPurchaseStatus } from './interfaces/IPurchase';
import { PurchaseStatus } from './enums/PurchaseStatus';
import { IProduct } from './interfaces/IProduct';
import { IPurchaseRequest } from './interfaces/IServiceRequest';

export class Purchase {
  private _purchase: IPurchase;

  constructor(purchase: IPurchase) {
    this._purchase = purchase;
  }

  get externalId(): string {
    return this._purchase.externalId;
  }

  get productId(): string {
    return this._purchase.productId;
  }

  get user(): string {
    return this._purchase.user;
  }

  get amount(): number {
    return this._purchase.amount;
  }

  get destination(): string {
    return this._purchase.destination;
  }

  get comment(): string {
    return this._purchase.comment;
  }

  get createdAt(): Date {
    return new Date(this._purchase.createdAt);
  }

  get updatedAt(): Date {
    return new Date(this._purchase.updatedAt);
  }

  get confirmationNumber(): number {
    return this._purchase.confirmationNumber;
  }

  get extra(): any {
    return this._purchase.extra;
  }

  get statusLog(): IPurchaseStatus[] {
    return this._purchase.statusLog;
  }

  get currentStatus(): PurchaseStatus {
    return this._purchase.statusLog[this._purchase.statusLog.length].code;
  }

  static createNewPurchase(np: INewPurchase): Partial<IPurchase> {
    return {
      ...np,
      statusLog: [this.createNewUpdate(PurchaseStatus.Pending)]
    };
  }

  static createNewPurchaseRequest(purchase: IPurchase, product: IProduct): IPurchaseRequest {
    return {
      id: purchase.externalId,
      destination: purchase.destination,
      productId: product.productId,
      terminalNo: '0',
      amount: purchase.amount,
      extra: !!purchase.extra ? purchase.extra : undefined
    };
  }

  static createNewUpdate(code: PurchaseStatus, additionalMessage?: string): IPurchaseStatus {
    const updatedAt = new Date();
    switch (code) {
      case PurchaseStatus.Pending:
        return {
          updatedAt,
          code,
          message: 'PURCHASE_INIT'
        };
      case PurchaseStatus.Approved:
        return {
          updatedAt,
          code,
          message: 'PURCHASE_SUCCEEDED'
        };
      case PurchaseStatus.Failed:
        return {
          updatedAt,
          code,
          message: `PURCHASE_FAILED: ${additionalMessage}`
        };
      case PurchaseStatus.Reverted:
        return {
          updatedAt,
          code,
          message: `PURCHASE_REVERTED: ${additionalMessage}`
        };
      case PurchaseStatus.Revision:
        return {
          updatedAt,
          code,
          message: `PURCHASE_UNDER_REVISION: ${additionalMessage}`
        };
    }
  }
}
