import { Document, Model, Types } from 'mongoose';

import { IWrite } from '../interfaces/base/Write';
import { IRead } from '../interfaces/base/Read';

export class RepositoryBase<T extends Document> implements IRead<T>, IWrite<T> {
  protected _model: Model<Document>;

  constructor(schemaModel: Model<Document>) {
    this._model = schemaModel;
  }

  async create(item: T): Promise<Document> {
    return await this._model.create(item);
  }

  async createMany(items: T[]): Promise<Document[]> {
    return await this._model.insertMany(items);
  }

  async retrieve(): Promise<Document[]> {
    return await this._model.find({}).exec();
  }

  async retrieveBy(
    conditions: any,
    projection?: any | null,
    options?: any | null
  ): Promise<Document[]> {
    return await this._model.find(conditions, projection, options).exec();
  }

  async update(_id: string, item: T): Promise<Document> {
    return await this._model.findByIdAndUpdate(_id, item, { new: true }).exec();
    //return await this._model.update({ _id }, item, { new: true }).exec();
  }

  async updateMany(
    conditions: any,
    item: T,
    options?: any | null
  ): Promise<T[]> {
    return await this._model.updateMany(conditions, item, options).exec();
  }

  async delete(_id: string): Promise<Document> {
    return await this._model.findByIdAndDelete(_id).exec();
    //return await this._model.remove({ _id: this.toObjectId(_id) }).exec();
  }

  async deleteMany(condition: any): Promise<any> {
    return await this._model.deleteMany(condition).exec();
  }

  async findById(_id: string): Promise<Document> {
    return await this._model.findById(_id).exec();
  }

  private toObjectId(_id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id);
  }
}
