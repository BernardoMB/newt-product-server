import { Document } from 'mongoose';

export interface IWrite<T> {
  create: (item: T) => Promise<Document>;
  createMany: (items: T[]) => Promise<Document[]>;
  update: (_id: string, item: T) => Promise<Document>;
  updateMany: (conditions: any, item: T, options?: any | null) => Promise<T[]>;
  delete: (_id: string) => Promise<Document>;
  deleteMany: (condition: any) => Promise<any>;
}
