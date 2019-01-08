import { Document } from 'mongoose';
import { PurchaseStatus } from '../enums/PurchaseStatus';

export interface IPurchaseStatus {
  updatedAt: Date;
  code: PurchaseStatus;
  message: string;
  extra?: any;
}

export interface IPurchase extends Document {
  externalId: string;
  productId: string;
  user: string;
  destination: string;
  createdAt?: Date;
  updatedAt?: Date;
  amount: number;
  confirmationNumber?: number;
  comment?: string;
  extra?: any;
  statusLog: IPurchaseStatus[];
}

export interface INewPurchase {
  productId: string;
  user: string;
  amount: number;
  destination: string;
  comment?: string;
}

export interface IPurchaseInfo {
  id: string;
  terminalNo: string;
  productId: string;
  destination: string;
  amount: number;
  extra?: any;
}
