import { Document } from 'mongoose';

export interface IRead<T> {
  retrieve: () => Promise<Document[]>;
  retrieveBy: (
    conditions: any,
    projection?: any | null,
    options?: any | null
  ) => Promise<Document[]>;
  findById: (id: string) => Promise<Document>;
}
