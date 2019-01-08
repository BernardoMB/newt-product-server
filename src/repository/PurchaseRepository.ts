import { RepositoryBase } from './base/RepositoryBase';
import { IPurchase, IPurchaseStatus } from './../models/interfaces/IPurchase';
import { PurchaseSchema } from '../data-access/schemas/PurchaseSchema';

export class PurchaseRepository extends RepositoryBase<IPurchase> {
  constructor() {
    super(PurchaseSchema);
  }

  async updateStatus(_id: string, status: IPurchaseStatus): Promise<IPurchase> {
    return <IPurchase>await this._model.findByIdAndUpdate(_id, { $push: { statusLog: status } }, { new: true }).exec();
  }
}
