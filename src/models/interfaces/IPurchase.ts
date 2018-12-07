import { Document } from 'mongoose';
import { PurchaseStatus } from '../enums/PurchaseStatus';

export interface IPurchase extends Document {
  product: string;
  user: string;
  destination: string;
  status: PurchaseStatus;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  confirmationNumber: number;
  comment?: string;
  extra?: any;
  statusLog: [{ updatedAt: Date; code: number; message: string; extra?: any }];
}

export interface INewPurchase {
  productId: string;
  user: string;
  amount: number;
  destination: string;
  comment?: string;
}