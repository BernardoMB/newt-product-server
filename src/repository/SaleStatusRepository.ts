import { RepositoryBase } from './base/RepositoryBase';
import { ISaleStatusResponseDoc, SaleStatusSchema } from '../data-access/schemas/SaleStatusSchema';

export class SaleStatusRepository extends RepositoryBase<ISaleStatusResponseDoc> {
  constructor() {
    super(SaleStatusSchema);
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ISaleStatusResponseDoc[]> {
    return <ISaleStatusResponseDoc[]>(
      await this._model.find({ date: { $gte: new Date(startDate), $lt: new Date(endDate) } }).exec()
    );
  }
}
