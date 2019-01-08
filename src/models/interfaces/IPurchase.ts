import { Document } from 'mongoose';
import { PurchaseStatus } from '../enums/PurchaseStatus';

export interface IPurchaseStatus {
  updatedAt: Date;
  code: PurchaseStatus;
  message: string;
  extra?: any;
}

export interface INewPurchase {
  productId: string;
  user: string;
  amount: number;
  destination: string;
  comment?: string;
}

export interface IPurchase extends Document {
  externalId: string;
  productId: string;
  user: string;
  amount: number;
  destination: string;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
  confirmationNumber?: number;
  extra?: any;
  statusLog: IPurchaseStatus[];
}
