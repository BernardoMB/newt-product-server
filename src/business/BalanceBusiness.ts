import { IBalanceBusiness } from './interfaces/IBalanceBusiness';
import { getBalance } from '../services/BalanceService';

import { ICredentials } from '../models/interfaces/ICredentials';
import { IBalanceResponse } from '../models/interfaces/IServiceResponse';

export class BalanceBusiness implements IBalanceBusiness {
  private _credentials: ICredentials;

  constructor() {
    this._credentials = {
      channelId : process.env.NEW_VISION_CHANNEL_ID,
      channelPassword: process.env.NEW_VISION_CHANNEL_PASSWORD
    };
  }

  async getExternalBalance() {
    const balance: IBalanceResponse = await getBalance(this._credentials);
    return {
      ...balance,
      date: new Date()
    };
  }
}
