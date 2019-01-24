import { credentials } from '../secrets';

import { IBalanceBusiness } from './interfaces/IBalanceBusiness';
import { getBalance, getExternalBalance } from '../services/BalanceService';

import { ICredentials } from '../models/interfaces/ICredentials';
import { IBalanceResponse } from '../models/interfaces/IServiceResponse';
import { IPurchaseRequest } from '../models/interfaces/IServiceRequest';

export class BalanceBusiness implements IBalanceBusiness {
  private _credentials: ICredentials;

  constructor() {
    this._credentials = credentials;
  }

  async getChannelBalance() {
    const balance: IBalanceResponse = await getBalance(this._credentials);
    return {
      ...balance,
      date: new Date()
    };
  }

  async getExternalBalance(item: IPurchaseRequest) {
    const externalBalance = await getExternalBalance(this._credentials, item);
    console.log(externalBalance);
    return {
      ...externalBalance,
      date: new Date()
    };
  }
}
