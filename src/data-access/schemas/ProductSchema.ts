import { Model, model, Schema } from 'mongoose';

import { IProduct } from '../../models/interfaces/IProduct';

const amount = {
  amount: { type: Number, required: true },
  description: { type: String, required: false },
  _id: false
};

const schema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  kind: { type: Number, required: false },
  amounts: {
    type: [amount],
    required: true,
    validate: value => {
      let valid = true;
      value.forEach(element => {
        if (typeof element.amount !== 'number') valid = false;
        if (typeof element.description !== 'string') valid = false;
      });
      return valid;
    }
  },
  providerId: { type: String, required: true },
  paymentCurrency: { type: String, required: true },
  icon: { type: String, required: false },
  extra: { type: Schema.Types.Mixed, required: false },
  timeout: { type: Number, required: true },
  supportsReversal: { type: Boolean, required: true },
  supportsCheckStatus: { type: Boolean, required: true },
  observation: { type: String, required: false }
});

export const ProductSchema: Model<IProduct> = model<IProduct>(
  'Product',
  schema
);
