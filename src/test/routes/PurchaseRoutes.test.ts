import * as request from 'supertest';
import { it, describe } from 'mocha';
import { expect } from 'chai';

import { sign } from 'jsonwebtoken';

import { environment } from './../../environment';
import { app } from './../../main';
import { ProductRepository } from '../../repository/ProductRepository';
import { PurchaseRepository } from '../../repository/PurchaseRepository';

import { IProduct } from '../../models/interfaces/IProduct';
import { PurchaseStatus } from '../../models/enums/PurchaseStatus';
import { IPurchase, INewPurchase } from '../../models/interfaces/IPurchase';
import { SaleStatusRepository } from '../../repository/SaleStatusRepository';

const products: Partial<IProduct>[] = [
  {
    name: 'MOVISTAR',
    productId: 'A',
    kind: 0,
    amounts: [
      {
        amount: 10,
        description: ''
      },
      {
        amount: 30,
        description: ''
      },
      {
        amount: 60,
        description: ''
      },
      {
        amount: 80,
        description: ''
      },
      {
        amount: 120,
        description: ''
      },
      {
        amount: 200,
        description: ''
      },
      {
        amount: 300,
        description: ''
      }
    ],
    providerId: 'NEW-VISION',
    paymentCurrency: 'MXN',
    icon: 'BASE64ICON OR URL',
    extra: {},
    timeout: 60000,
    supportsReversal: false,
    supportsCheckStatus: false,
    observation: 'Alcanzando 30s se declina la recarga'
  },
  {
    name: 'TELMEX',
    productId: 'TELMEX',
    kind: 1,
    amounts: [],
    providerId: 'NEW-VISION',
    paymentCurrency: 'MXN',
    icon: 'BASE64ICON OR URL',
    extra: {},
    timeout: 30000,
    supportsReversal: true,
    supportsCheckStatus: false
  },
  {
    name: 'SITAG',
    productId: 'SIT',
    kind: 0,
    amounts: [
      {
        amount: 200,
        description: ''
      },
      {
        amount: 300,
        description: ''
      }
    ],
    providerId: 'NEW-VISION',
    paymentCurrency: 'MXN',
    icon: 'BASE64ICON OR URL',
    extra: {},
    timeout: 30000,
    supportsReversal: true,
    supportsCheckStatus: false
  },
  {
    name: 'PLAYSTATION 50 USD',
    productId: 'ZPS50',
    kind: 2,
    amounts: [
      {
        amount: 715,
        description: ''
      }
    ],
    providerId: 'NEW-VISION',
    paymentCurrency: 'MXN',
    icon: 'BASE64ICON OR URL',
    extra: {},
    timeout: 30000,
    supportsReversal: false,
    supportsCheckStatus: false
  }
];

const authToken = sign('5c1996e35e015bc3483c153b', environment.jwtHash);

const topUpNewPurchase: INewPurchase = {
  productId: 'A',
  user: '5c1996e35e015bc3483c153b',
  amount: 10,
  destination: '5500000012',
  comment: 'This should result in a succesful purchase object with a succesful status (1)'
};

const payBillNewPurchase: INewPurchase = {
  productId: 'TELMEX',
  user: '5c1996e35e015bc3483c153b',
  amount: 600,
  destination: '0290205736',
  comment: 'This should result in a succesful purchase object with a succesful status (1)'
};

const payTollNewPurchase: INewPurchase = {
  productId: 'SIT',
  user: '5c1996e35e015bc3483c153b',
  amount: 200,
  destination: 'STAG123456780',
  comment: 'This should result in a succesful purchase object with a succesful status (1)'
};

const payPrepaidNewPurchase: INewPurchase = {
  productId: 'ZPS50',
  user: '5c1996e35e015bc3483c153b',
  amount: 715,
  destination: '5501330036',
  comment: 'This should result in a succesful purchase object with a succesful status (1)'
};

describe('PURCHASE', function() {
  const productRepository = new ProductRepository();
  const purchaseRepository = new PurchaseRepository();
  const saleStatusRepository = new SaleStatusRepository();
  before(async function() {
    await productRepository.drop();
    await productRepository.createMany(<IProduct[]>products);
  });
  beforeEach(async function() {
    await purchaseRepository.drop();
    await saleStatusRepository.drop();
  });
  after(async function() {
    await productRepository.drop();
    await purchaseRepository.drop();
    await saleStatusRepository.drop();
  });

  describe('POST /purchase', function() {
    it('Creates a purchase for TopUp Product A (Movistar)', async function() {
      try {
        const res = await request(app)
          .post('/api/purchase')
          .set('Authorization', authToken)
          .send(topUpNewPurchase)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res.body).to.have.property('purchase');
        const purchase: IPurchase = res.body['purchase'];
        expect(purchase.productId, 'ProductId should be correct').to.equal(topUpNewPurchase.productId);
        expect(purchase.destination, 'Destination should be correct').to.equal(topUpNewPurchase.destination);
        expect(purchase.statusLog.length, 'Should have two status updates').to.equal(2);
        expect(purchase.statusLog[0].code, 'First update should be pending (0)').to.equal(<number>(
          PurchaseStatus.Pending
        ));
        if (purchase.statusLog[1].code !== <number>PurchaseStatus.Approved) {
          console.error('\t', purchase.statusLog[1].message);
        }
        expect(purchase.statusLog[1].code, 'Second update should be approved (1)').to.equal(<number>(
          PurchaseStatus.Approved
        ));
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
    it('Creates a purchase for PayBill Product TELMEX', async function() {
      try {
        const res = await request(app)
          .post('/api/purchase')
          .set('Authorization', authToken)
          .send(payBillNewPurchase)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res.body).to.have.property('purchase');
        const purchase: IPurchase = res.body['purchase'];
        expect(purchase.productId, 'ProductId should be correct').to.equal(payBillNewPurchase.productId);
        expect(purchase.destination, 'Destination should be correct').to.equal(payBillNewPurchase.destination);
        expect(purchase.statusLog.length, 'Should have two status updates').to.equal(2);
        expect(purchase.statusLog[0].code, 'First update should be pending (0)').to.equal(<number>(
          PurchaseStatus.Pending
        ));
        if (purchase.statusLog[1].code !== <number>PurchaseStatus.Approved) {
          console.error('\t', purchase.statusLog[1].message);
        }
        expect(purchase.statusLog[1].code, 'Second update should be approved (1)').to.equal(<number>(
          PurchaseStatus.Approved
        ));
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
    it('Creates a purchase for PayToll Product SIT (SITAG)', async function() {
      try {
        const res = await request(app)
          .post('/api/purchase')
          .set('Authorization', authToken)
          .send(payTollNewPurchase)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res.body).to.have.property('purchase');
        const purchase: IPurchase = res.body['purchase'];
        expect(purchase.productId, 'ProductId should be correct').to.equal(payTollNewPurchase.productId);
        expect(purchase.destination, 'Destination should be correct').to.equal(payTollNewPurchase.destination);
        expect(purchase.statusLog.length, 'Should have two status updates').to.equal(2);
        expect(purchase.statusLog[0].code, 'First update should be pending (0)').to.equal(<number>(
          PurchaseStatus.Pending
        ));
        if (purchase.statusLog[1].code !== <number>PurchaseStatus.Approved) {
          console.error('\t', purchase.statusLog[1].message);
        }
        expect(purchase.statusLog[1].code, 'Second update should be approved (1)').to.equal(<number>(
          PurchaseStatus.Approved
        ));
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
    it('Creates a purchase for PayPrepaid Product ZPS50 (PS 50 USD)', async function() {
      try {
        const res = await request(app)
          .post('/api/purchase')
          .set('Authorization', authToken)
          .send(payPrepaidNewPurchase)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res.body).to.have.property('purchase');
        const purchase: IPurchase = res.body['purchase'];
        expect(purchase.productId, 'ProductId should be correct').to.equal(payPrepaidNewPurchase.productId);
        expect(purchase.destination, 'Destination should be correct').to.equal(payPrepaidNewPurchase.destination);
        expect(purchase.statusLog.length, 'Should have two status updates').to.equal(2);
        expect(purchase.statusLog[0].code, 'First update should be pending (0)').to.equal(<number>(
          PurchaseStatus.Pending
        ));
        expect(purchase.statusLog[1].code, 'Second update should be approved (1)').to.equal(<number>(
          PurchaseStatus.Approved
        ));
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
  });

  describe('GET /purchase/:id', function() {
    it('Creates a purchase and retrieves it by id', async function() {
      try {
        const destination = '5500000013';
        const res1 = await request(app)
          .post('/api/purchase')
          .set('Authorization', authToken)
          .send({ ...topUpNewPurchase, destination })
          .expect(200);
        const createdPurchase = res1.body['purchase'];
        const res2 = await request(app)
          .get(`/api/purchase/${createdPurchase._id}`)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res2.body).to.have.property('purchase');
        const purchase = res2.body['purchase'];
        expect(purchase.productId).to.equal(topUpNewPurchase.productId);
        expect(purchase.destination).to.equal(destination);
        expect(purchase._id).to.equal(createdPurchase._id);
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
  });

  describe('GET /purchase/externalId/:externalId', function() {
    it('Creates a purchase and retrieves it by its externalId', async function() {
      try {
        const destination = '5500000014';
        const res1 = await request(app)
          .post('/api/purchase')
          .set('Authorization', authToken)
          .send({ ...topUpNewPurchase, destination })
          .expect(200);
        const createdPurchase = res1.body['purchase'];
        const res2 = await request(app)
          .get(`/api/purchase/externalId/${createdPurchase.externalId}`)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res2.body).to.have.property('purchase');
        const purchase = res2.body['purchase'];
        expect(purchase.productId).to.equal(topUpNewPurchase.productId);
        expect(purchase.destination).to.equal(destination);
        expect(purchase.externalId).to.equal(createdPurchase.externalId);
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
  });

  describe('GET /purchase/user/:id', function() {
    it('Creates purchases for a user and retrieves them by user id', async function() {
      try {
        await request(app)
          .post('/api/purchase')
          .set('Authorization', authToken)
          .send({ ...topUpNewPurchase, destination: '5500000016' })
          .expect(200);
        await request(app)
          .post('/api/purchase')
          .set('Authorization', authToken)
          .send({ ...payBillNewPurchase, destination: '0290205737' })
          .expect(200);
        const res = await request(app)
          .get('/api/purchase/user/5c1996e35e015bc3483c153b')
          .set('Authorization', authToken)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res.body).to.have.property('purchases');
        const purchases = res.body['purchases'];
        expect(purchases).to.be.an('array');
        expect(purchases.length).to.equal(2);
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
  });
});
