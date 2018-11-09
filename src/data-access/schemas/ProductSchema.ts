import { Model, model, Schema } from "mongoose";

import { IProduct } from "../../models/interfaces/IProduct";

const schema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  kind: { type: Number, required: false },
  amounts: { type: { amount: Number, description: String }, required: true },
  providerId: { type: String, required: true },
  paymentCurrency: { type: String, required: true },
  icon: { type: String, required: false },
  extra: { type: Schema.Types.Mixed, required: false },
  timeout: { type: Number, required: true },
  supportsReversal: { type: Boolean, required: true },
  supportsCheckStatus: { type: Boolean, required: true },
  observation: { type: String, required: true }
});

export const ProductSchema: Model<IProduct> = model<IProduct>(
  "product",
  schema
);
