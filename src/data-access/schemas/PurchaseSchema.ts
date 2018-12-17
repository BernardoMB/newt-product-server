import { Model, model, Schema } from 'mongoose';

import { IPurchase } from '../../models/interfaces/IPurchase';

const status = {
  updatedAt: { type: Date, required: true },
  code: { type: String, required: true },
  message: { type: String, required: true },
  extra: { type: Schema.Types.Mixed, required: false },
  _id: false
};

const schema: Schema = new Schema({
  product: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true },
  destination: { type: String, required: true },
  status: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  amount: { type: Number, required: true },
  confirmationNumber: { type: String, required: false },
  comment: { type: String, required: false },
  extra: { type: Schema.Types.Mixed, required: false },
  statusLog: { type: [status], required: true }
});

export const PurchaseSchema: Model<IPurchase> = model<IPurchase>(
  'purchase',
  schema
);
