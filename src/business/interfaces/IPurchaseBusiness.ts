import { IPurchase, INewPurchase, IPurchaseStatus } from './../../models/interfaces/IPurchase';

export interface IPurchaseBusiness {
  retrieve: () => Promise<IPurchase[]>;

  retrieveByClientId: (user: string) => Promise<IPurchase[]>;

  findById: (_id: string) => Promise<IPurchase>;

  findByExternalId: (externalId: string) => Promise<IPurchase>;

  create: (item: INewPurchase) => Promise<IPurchase>;

  update: (_id: string, item: IPurchase) => Promise<IPurchase>;

  updateStatus: (_id: string, status: IPurchaseStatus) => Promise<IPurchase>;

  delete: (_id: string) => Promise<boolean>;
}
