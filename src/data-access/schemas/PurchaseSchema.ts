import { Model, model, Schema } from 'mongoose';

import { IPurchase } from '../../models/interfaces/IPurchase';
import { paddNum } from '../../helpers/formatHelpers';

const status = {
  updatedAt: { type: Date, required: true },
  code: { type: String, required: true },
  message: { type: String, required: true },
  extra: { type: Schema.Types.Mixed, required: false },
  _id: false
};

const schema: Schema = new Schema(
  {
    product: { type: String, required: true },
    externalId: { type : String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    destination: { type: String, required: true },
    status: { type: Number, required: true },
    amount: { type: Number, required: true },
    confirmationNumber: { type: String, required: false },
    comment: { type: String, required: false },
    extra: { type: Schema.Types.Mixed, required: false },
    statusLog: { type: [status], required: true }
  },
  {
    timestamps: true
  }
);

schema.pre('save', function(newt) {
  var self : any = this;
  self.constructor.count(function(err, data) {
    if(err){
       return newt(err);
    }
    self.externalId = paddNum(12, data + 1);
    return newt();
  });
})

export const PurchaseSchema: Model<IPurchase> = model<IPurchase>(
  'Purchase',
  schema
);
