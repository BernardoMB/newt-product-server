import { IProduct } from "../models/interfaces/IProduct";
import { ProductRepository } from "../repository/ProductRepository";
import { IProductBusiness } from "./interfaces/IProductBusiness";

export class ProductBusiness implements IProductBusiness {
  private _productRepository: ProductRepository;

  constructor() {
    this._productRepository = new ProductRepository();
  }

  retrieve(callback: (error: any, result: Array<IProduct>) => void) {
    this._productRepository.retrieve(callback);
  }

  findById(_id: string, callback: (error: any, result: IProduct) => void) {
    this._productRepository.findById(_id, callback);
  }

  create(item: IProduct, callback: (error: any, result: IProduct) => void) {
    this._productRepository.create(item, callback);
  }

  update(
    _id: string,
    item: IProduct,
    callback: (error: any, result: IProduct) => void
  ) {
    this._productRepository.findById(_id, (err, res) => {
      if (err || !res) {
        callback(err, res);
      } else {
        this._productRepository.update(<any>res._id, item, callback);
      }
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._productRepository.delete(_id, callback);
  }
}
