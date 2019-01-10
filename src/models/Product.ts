import { IProduct } from './interfaces/IProduct';

export class Product {
  private _product: IProduct;

  constructor(product: IProduct) {
    this._product = product;
  }

  get name(): string {
    return this._product.name;
  }

  get productId(): string {
    return this._product.productId;
  }

  get kind(): number {
    return this._product.kind;
  }

  get amounts(): Array<{ amount: number; description: string }> {
    return this._product.amounts;
  }

  get commission(): number {
    return this._product.commission;
  }

  get providerId(): string {
    return this._product.providerId;
  }

  get paymentCurrency(): string {
    return this._product.paymentCurrency;
  }

  get icon(): string {
    return this._product.icon;
  }

  get extra(): any {
    return !!this._product.extra ? this._product.extra : {};
  }

  get timeout(): number {
    return this._product.timeout;
  }

  get supportsReversal(): boolean {
    return this._product.supportsReversal;
  }

  get supportsCheckStatus(): boolean {
    return this._product.supportsCheckStatus;
  }

  get observation(): string {
    return !!this._product.observation ? this._product.observation : '';
  }

  doesNotSupportAmount(amount: number): boolean {
    return this._product.amounts.length > 0 && this._product.amounts.filter(a => a.amount === amount).length === 0;
  }
}
