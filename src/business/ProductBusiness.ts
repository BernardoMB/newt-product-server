import { ProductRepository } from '../repository/ProductRepository';
import { IProductBusiness } from './interfaces/IProductBusiness';

import { IProduct } from '../models/interfaces/IProduct';

export class ProductBusiness implements IProductBusiness {
  private _productRepository: ProductRepository;

  constructor() {
    this._productRepository = new ProductRepository();
  }

  async retrieve(): Promise<IProduct[]> {
    return await (<Promise<IProduct[]>>this._productRepository.retrieve());
  }

  async findById(_id: string): Promise<IProduct> {
    const res = <IProduct>await this._productRepository.findById(_id);
    this.throwIfNotExists(res);
    return res;
  }

  async create(item: IProduct): Promise<IProduct> {
    return await (<Promise<IProduct>>this._productRepository.create(item));
  }

  async update(_id: string, item: IProduct): Promise<IProduct> {
    const res = await this._productRepository.findById(_id);
    this.throwIfNotExists(res);
    return await (<Promise<IProduct>>this._productRepository.update(<any>res._id, item));
  }

  async delete(_id: string): Promise<boolean> {
    this.throwIfNotExists(await this._productRepository.delete(_id));
    return true;
  }

  throwIfNotExists(item: IProduct) {
    if (!item) throw { message: 'Product not found', code: 404 };
  }
}
