import { IBalance } from '../../models/interfaces/IBalance';
import { IPurchaseRequest } from '../../models/interfaces/IServiceRequest';

export interface IBalanceBusiness {
  getChannelBalance: () => Promise<IBalance>;
  getExternalBalance: (item: IPurchaseRequest) => Promise<any>;
}
