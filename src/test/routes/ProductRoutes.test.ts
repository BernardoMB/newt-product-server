import * as request from 'supertest';
import { it, describe } from 'mocha';
import { expect } from 'chai';

import { app } from './../../main';
import { ProductRepository } from '../../repository/ProductRepository';

import { IProduct } from '../../models/interfaces/IProduct';
import { IUser } from '../../models/interfaces/IUser';
import { UserRepository } from '../../repository/UserRepository';

const newProduct: Partial<IProduct> = {
  name: 'PAQUETES AMAZON + SPOTIFY',
  productId: 'AYN',
  kind: 0,
  amounts: [
    {
      amount: 20,
      description: ''
    },
    {
      amount: 40,
      description: ''
    },
    {
      amount: 60,
      description: ''
    },
    {
      amount: 100,
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
};

const updatedProduct: Partial<IProduct> = {
  ...newProduct,
  name: 'Updated product',
  amounts: [
    ...newProduct.amounts,
    {
      amount: 200,
      description: 'New amount'
    }
  ]
};

const testUser: Partial<IUser> = {
  username: 'irving',
  password: 'carla'
};

describe('PRODUCT', function() {
  const productRepository = new ProductRepository();
  const userRepository = new UserRepository();
  before(async function() {
    await userRepository.drop();
    await userRepository.create(<IUser>testUser);
  });
  beforeEach(async function() {
    await productRepository.drop();
  });
  after(async function() {
    await productRepository.drop();
  });
  describe('GET /product', function() {
    it('Returns an array of products', async function() {
      try {
        const res = await request(app)
          .get('/api/product')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res.body).to.have.property('products');
        expect(res.body['products']).to.be.an('array');
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
  });

  describe('POST /product', function() {
    it('Creates a new product succesfully', async function() {
      try {
        const authRes = await request(app)
          .post('/api/user/login')
          .send(testUser)
          .expect(200);
        const token = authRes.body['user']['token'];
        const res = await request(app)
          .post('/api/product')
          .set('Authorization', token)
          .send(newProduct)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res.body).to.have.property('product');
        const product = res.body['product'];
        expect(product.productId).to.equal('AYN');
        expect(product.kind).to.equal(0);
        expect(product.amounts).to.be.an('array');
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
  });

  describe('GET /product/:id', function() {
    it('Creates a new product and retrieves it by id', async function() {
      try {
        const authRes = await request(app)
          .post('/api/user/login')
          .send(testUser)
          .expect(200);
        const token = authRes.body['user']['token'];
        const res1 = await request(app)
          .post('/api/product')
          .set('Authorization', token)
          .send(newProduct)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        const createdProduct = res1.body['product'];
        const res2 = await request(app)
          .get(`/api/product/${createdProduct._id}`)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res2.body).to.have.property('product');
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
  });

  describe('PUT /product/:id', function() {
    it('Creates a new product and updates it succesfully', async function() {
      try {
        const authRes = await request(app)
          .post('/api/user/login')
          .send(testUser)
          .expect(200);
        const token = authRes.body['user']['token'];
        const res1 = await request(app)
          .post('/api/product')
          .set('Authorization', token)
          .send(newProduct)
          .expect(200);
        const createdProduct = res1.body['product'];
        const res2 = await request(app)
          .put(`/api/product/${createdProduct._id}`)
          .set('Authorization', token)
          .send(updatedProduct)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(201);
        expect(res2.body).to.have.property('product');
        const product = res2.body['product'];
        expect(product.name, 'Name should have changed').to.equal(updatedProduct.name);
        expect(product.amounts).to.be.an('array');
        expect(product.amounts[4].amount, 'Updated amount amount field should have changed').to.equal(200);
        expect(product.amounts[4].description, 'Updated amount description field should have changed').to.equal(
          'New amount'
        );
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
  });

  describe('DELETE /product/:id', function() {
    it('Creates a new product and deletes it succesfully', async function() {
      try {
        const authRes = await request(app)
          .post('/api/user/login')
          .send(testUser)
          .expect(200);
        const token = authRes.body['user']['token'];
        const res1 = await request(app)
          .post('/api/product')
          .set('Authorization', token)
          .send(newProduct)
          .expect(200);
        const createdProduct = res1.body['product'];
        const res2 = await request(app)
          .delete(`/api/product/${createdProduct._id}`)
          .set('Authorization', token)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res2.body).to.have.property('id');
        expect(res2.body['id'], 'Id should be the same as the deleted product id').to.equal(createdProduct._id);
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
  });
});
