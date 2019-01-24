import * as mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  productId: string;
  kind?: number;
  amounts: Array<{ amount: number; description: string }>;
  commission?: number;
  providerId: string;
  paymentCurrency: string;
  icon?: string;
  extra?: any;
  timeout: number;
  supportsReversal: boolean;
  supportsCheckStatus: boolean;
  observation?: string;
  description: {es: string, en: string},
  destinationLength: number,
  isActive: boolean
}
