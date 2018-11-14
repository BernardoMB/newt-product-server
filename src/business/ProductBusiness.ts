import { IProduct } from '../models/interfaces/IProduct';
import { ProductRepository } from '../repository/ProductRepository';
import { IProductBusiness } from './interfaces/IProductBusiness';
import { Document } from 'mongoose';

export class ProductBusiness implements IProductBusiness {
  private _productRepository: ProductRepository;

  constructor() {
    this._productRepository = new ProductRepository();
  }

  async retrieve(): Promise<IProduct[]> {
    return await (<Promise<IProduct[]>>this._productRepository.retrieve());
  }

  async findById(_id: string): Promise<IProduct> {
    return await (<Promise<IProduct>>this._productRepository.findById(_id));
  }

  async create(item: IProduct): Promise<IProduct> {
    return await (<Promise<IProduct>>this._productRepository.create(item));
  }

  async update(_id: string, item: IProduct): Promise<IProduct> {
    let res: Document;
    res = await this._productRepository.findById(_id);
    if (!res) {
      return undefined;
    }
    return await (<Promise<IProduct>>(
      this._productRepository.update(<any>res._id, item)
    ));
  }

  async delete(_id: string): Promise<boolean> {
    return !!(await this._productRepository.delete(_id));
    //return await this._productRepository.delete(_id);
  }
}
