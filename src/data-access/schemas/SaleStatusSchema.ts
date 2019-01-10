import { Model, model, Schema, Document } from 'mongoose';

import { ISaleStatusResponse } from '../../models/interfaces/IServiceResponse';

export interface ISaleStatusResponseDoc extends ISaleStatusResponse, Document {}

const schema: Schema = new Schema({
  externalId: { type: String, required: true, unique: true, index: true },
  amount: { type: Number, required: true },
  rcode: { type: String, required: true },
  date: { type: Date, required: true, index: true, get: v => new Date(v) },
  confirmationCode: { type: String, required: false },
  extra: { type: Schema.Types.Mixed, required: false }
});

export const SaleStatusSchema: Model<ISaleStatusResponseDoc> = model<ISaleStatusResponseDoc>('SaleStatus', schema);
