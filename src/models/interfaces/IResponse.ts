export interface IBalanceResponse {
  balance: number;
  limit: number;
}

export interface ISaleStatusResponse {
  id: string;
  amount: number;
  rcode: string;
  date: Date;
  confirmationCode: string;
  extra?: any;
}
