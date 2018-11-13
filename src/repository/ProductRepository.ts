import { RepositoryBase } from './base/RepositoryBase';
import { IProduct } from './../models/interfaces/IProduct';
import { ProductSchema } from '../data-access/schemas/ProductSchema';

export class ProductRepository extends RepositoryBase<IProduct> {
  constructor() {
    super(ProductSchema);
  }
}
