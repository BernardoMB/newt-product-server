import { Document } from "mongoose";

export interface IRead<T> {
  retrieve: () => Promise<Document[]>;
  findById: (id: string) => Promise<Document>;
}
