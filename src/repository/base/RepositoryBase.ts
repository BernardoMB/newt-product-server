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

  async retrieve(): Promise<Document[]> {
    return await this._model.find({}).exec();
  }

  async update(_id: string, item: T) {
    return await this._model.update({ _id }, item, { new: true }).exec();
  }

  async delete(_id: string) {
    return await this._model.remove({ _id: this.toObjectId(_id) }).exec();
  }

  async findById(_id: string) {
    return await this._model.findById(_id).exec();
  }

  private toObjectId(_id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id);
  }
}
