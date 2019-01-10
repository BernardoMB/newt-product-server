export interface IBalanceResponse {
  balance: number;
  limit: number;
}

export interface ISaleStatusResponse {
  externalId: string;
  amount: number;
  rcode: string;
  date: Date;
  confirmationCode: string;
  extra?: any;
}
