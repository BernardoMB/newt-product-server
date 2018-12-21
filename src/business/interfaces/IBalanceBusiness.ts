import { IBalance } from '../../models/interfaces/IBalance;';

export interface IBalanceBusiness {
  getExternalBalance: () => Promise<IBalance>;
}
