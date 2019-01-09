import { RepositoryBase } from './base/RepositoryBase';
import { UserSchema } from '../data-access/schemas/UserSchema';
import { IUser } from '../models/interfaces/IUser';

export class UserRepository extends RepositoryBase<IUser> {
  constructor() {
    super(UserSchema);
  }

  async login(credentials : { username : string, password: string} ): Promise<IUser> {
    return <IUser>await this._model.findOne({username: credentials.username});
  }
}
