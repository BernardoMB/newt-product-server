import { IUser } from '../../models/interfaces/IUser';

export interface IUserBusiness {

  login: (credentials : {username: string, password: string}) => Promise<IUser>;

  create: (item: IUser) => Promise<IUser>;
}
