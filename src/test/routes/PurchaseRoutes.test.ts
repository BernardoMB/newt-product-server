import * as request from 'supertest';
import { it, describe } from 'mocha';
import { expect } from 'chai';
import { app } from './../../main';
import { ProductRepository } from '../../repository/ProductRepository';
import { IProduct } from '../../models/interfaces/IProduct';
import { PurchaseRepository } from '../../repository/PurchaseRepository';

const products: Partial<IProduct>[] = [
  {
    name: 'MOVISTAR',
    code: 'A',
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
    code: 'TELMEX',
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
    code: 'SIT',
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
    code: 'ZPS50',
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

const topUpNewPurchase = {
  productId: 'A',
  user: '5c1996e35e015bc3483c153b',
  amount: 10,
  destination: '5500000012',
  comment: 'This should result in a succesful purchase object with a succesful status (1)'
};

const payBillNewPurchase = {
  productId: 'TELMEX',
  user: '5c1996e35e015bc3483c153b',
  amount: 600,
  destination: '0290205736',
  comment: 'This should result in a succesful purchase object with a succesful status (1)'
};

const payTollNewPurchase = {
  productId: 'SIT',
  user: '5c1996e35e015bc3483c153b',
  amount: 200,
  destination: 'STAG123456780',
  comment: 'This should result in a succesful purchase object with a succesful status (1)'
};

const payPrepaidNewPurchase = {
  productId: 'ZPS50',
  user: '5c1996e35e015bc3483c153b',
  amount: 715,
  destination: '5501330036',
  comment: 'This should result in a succesful purchase object with a succesful status (1)'
};

describe('PURCHASE', function() {
  before(async function() {
    const productRepository = new ProductRepository();
    await productRepository.drop();
    await productRepository.createMany(<IProduct[]>products);
  });
  beforeEach(async function() {
    const purchaseRepository = new PurchaseRepository();
    await purchaseRepository.drop();
  });

  describe('POST /purchase', function() {
    it('Creates a purchase for TopUp Product A (Movistar)', function(done) {
      request(app)
        .post('/api/purchase')
        .send(topUpNewPurchase)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.property('purchase');
          const purchase = res.body['purchase'];
          expect(purchase.product).to.equal('A');
          expect(purchase.destination).to.equal('5500000012');
          expect(purchase.statusLog.length).to.equal(2);
          //INIT_PURCHCASE
          expect(purchase.statusLog[0].code).to.equal(0);
          //PURCHASE_SUCCEEDEED
          expect(purchase.statusLog[1].code).to.equal(1);
          done();
        });
    });
    it('Creates a purchase for PayBill Product TELMEX', function(done) {
      request(app)
        .post('/api/purchase')
        .send(payBillNewPurchase)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.property('purchase');
          const purchase = res.body['purchase'];
          expect(purchase.product).to.equal('TELMEX');
          expect(purchase.destination).to.equal('0290205736');
          expect(purchase.statusLog.length).to.equal(2);
          //INIT_PURCHCASE
          expect(purchase.statusLog[0].code).to.equal(0);
          // //PURCHASE_SUCCEEDEED
          expect(purchase.statusLog[1].code).to.equal(1);
          done();
        });
    });
    it('Creates a purchase for PayToll Product SIT (SITAG)', function(done) {
      request(app)
        .post('/api/purchase')
        .send(payTollNewPurchase)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.property('purchase');
          const purchase = res.body['purchase'];
          expect(purchase.product).to.equal('SIT');
          expect(purchase.destination).to.equal('STAG123456780');
          expect(purchase.statusLog.length).to.equal(2);
          //INIT_PURCHCASE
          expect(purchase.statusLog[0].code).to.equal(0);
          // //PURCHASE_SUCCEEDEED
          expect(purchase.statusLog[1].code).to.equal(1);
          done();
        });
    });
    it('Creates a purchase for PayPrepaid Product ZPS50 (PS 50 USD)', function(done) {
      request(app)
        .post('/api/purchase')
        .send(payPrepaidNewPurchase)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.property('purchase');
          const purchase = res.body['purchase'];
          expect(purchase.product).to.equal('ZPS50');
          expect(purchase.destination).to.equal('5501330036');
          expect(purchase.statusLog.length).to.equal(2);
          //INIT_PURCHCASE
          expect(purchase.statusLog[0].code).to.equal(0);
          // //PURCHASE_SUCCEEDEED
          expect(purchase.statusLog[1].code).to.equal(1);
          done();
        });
    });
  });

  describe('GET /purchase/:id', function() {
    it('Creates a purchase and retrieves it by id', function(done) {
      request(app)
        .post('/api/purchase')
        .send({ ...topUpNewPurchase, destination: '5500000013' })
        .expect(200)
        .then(res => {
          const createdPurchase = res.body['purchase'];
          request(app)
            .get(`/api/purchase/${createdPurchase._id}`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then(res => {
              expect(res.body).to.have.property('purchase');
              const purchase = res.body['purchase'];
              expect(purchase.product).to.equal('A');
              expect(purchase.destination).to.equal('5500000013');
              expect(purchase._id).to.equal(createdPurchase._id);
              done();
            });
        });
    });
  });

  describe('GET /purchase/externalId/:externalId', function() {
    it('Creates a purchase and retrieves it by its externalId', function(done) {
      request(app)
        .post('/api/purchase')
        .send({ ...topUpNewPurchase, destination: '5500000014' })
        .expect(200)
        .then(res => {
          const createdPurchase = res.body['purchase'];
          request(app)
            .get(`/api/purchase/externalId/${createdPurchase.externalId}`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then(res => {
              expect(res.body).to.have.property('purchase');
              const purchase = res.body['purchase'];
              expect(purchase.product).to.equal('A');
              expect(purchase.destination).to.equal('5500000014');
              expect(purchase.externalId).to.equal(createdPurchase.externalId);
              done();
            });
        });
    });
  });

  describe('GET /purchase/user/:id', function() {
    it('Creates purchases for a user and retrieves them by user id', function(done) {
      request(app)
        .post('/api/purchase')
        .send({ ...topUpNewPurchase, destination: '5500000016' })
        .expect(200)
        .then(res => {
          request(app)
            .post('/api/purchase')
            .send({ ...payBillNewPurchase, destination: '0290205737' })
            .expect(200)
            .then(res => {
              request(app)
                .get('/api/purchase/user/5c1996e35e015bc3483c153b')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .then(res => {
                  expect(res.body).to.have.property('purchases');
                  const purchases = res.body['purchases'];
                  expect(purchases).to.be.an('array');
                  expect(purchases.length).to.equal(2);
                  done();
                });
            });
        });
    });
  });
});
