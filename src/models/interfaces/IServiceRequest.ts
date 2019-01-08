export interface IPurchaseRequest {
  id: string;
  terminalNo: string;
  productId: string;
  destination: string;
  amount: number;
  extra?: any;
}
