import { IBalanceBusiness } from './interfaces/IBalanceBusiness';
import { getBalance } from '../services/BalanceService';
import { ICredentials } from '../models/interfaces/ICredentials';
import { credentials } from '../secrets';
import { IBalanceResponse } from '../models/interfaces/IResponse';

export class BalanceBusiness implements IBalanceBusiness {
  private _credentials: ICredentials;

  constructor() {
    this._credentials = credentials;
  }

  async getExternalBalance() {
    const balance: IBalanceResponse = await getBalance(this._credentials);
    return {
      ...balance,
      date: new Date()
    };
  }
}
