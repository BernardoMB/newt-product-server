import { Document } from 'mongoose';

export interface IWrite<T> {
    create: (item: T) => Promise<Document>;
    update: (_id: string, item: T) =>  Promise<Document>;
    delete: (_id: string) => Promise<any>;
}