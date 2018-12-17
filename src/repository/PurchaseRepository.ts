import { RepositoryBase } from './base/RepositoryBase';
import { IPurchase } from './../models/interfaces/IPurchase';
import { PurchaseSchema } from '../data-access/schemas/PurchaseSchema';

export class PurchaseRepository extends RepositoryBase<IPurchase> {
  constructor() {
    super(PurchaseSchema);
  }
}
