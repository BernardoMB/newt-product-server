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

  /**
   * @apiDefine ProductNotFoundError
   *
   * @apiError (404) ProductNotFound No product with the <code>id</code> could be found.
   *
   * @apiErrorExample {json} ProductNotFound:
   * HTTP/1.1 404 Not Found
   * {
   *   "message": "(PUT) /api/product/5beb714fdf45f6e56009a24b |  Error updating product: Product not found",
   *   "code": 404
   * }
   */
  throwIfNotExists(item: IProduct) {
    if (!item) throw { message: 'Product not found', code: 404 };
  }
}
