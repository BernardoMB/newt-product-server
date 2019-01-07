import * as request from 'supertest';
import { it, describe } from 'mocha';
import { expect } from 'chai';
import { app } from './../../main';
import { ProductRepository } from '../../repository/ProductRepository';

const newProduct = {
  name: 'PAQUETES AMAZON + SPOTIFY',
  code: 'AYN',
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

const updatedProduct = {
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

describe('PRODUCT', function() {
  beforeEach(async function() {
    const productRepository = new ProductRepository();
    await productRepository.drop();
  });
  describe('GET /product', function() {
    it('Returns an array of products as JSON', function(done) {
      request(app)
        .get('/api/product')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.property('products');
          expect(res.body['products']).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /product', function() {
    it('Creates a new product and returns it as JSON', function(done) {
      request(app)
        .post('/api/product')
        .send(newProduct)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.property('product');
          const product = res.body['product'];
          expect(product.code).to.equal('AYN');
          expect(product.kind).to.equal(0);
          expect(product.amounts).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /product/:id', function() {
    it('Creates a new product and retrieves it by id', function(done) {
      request(app)
        .post('/api/product')
        .send(newProduct)
        .expect(200)
        .then(res => {
          const createdProduct = res.body['product'];
          request(app)
            .get(`/api/product/${createdProduct._id}`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then(res => {
              expect(res.body).to.have.property('product');
              done();
            });
        });
    });
  });

  describe('PUT /product/:id', function() {
    it('Creates a new product and updates it succesfully', function(done) {
      request(app)
        .post('/api/product')
        .send(newProduct)
        .expect(200)
        .then(res => {
          const createdProduct = res.body['product'];
          request(app)
            .put(`/api/product/${createdProduct._id}`)
            .send(updatedProduct)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201)
            .then(res => {
              expect(res.body).to.have.property('product');
              const product = res.body['product'];
              expect(product.name).to.equal(updatedProduct.name);
              expect(product.amounts).to.be.an('array');
              expect(product.amounts[4].amount).to.equal(200);
              expect(product.amounts[4].description).to.equal('New amount');
              done();
            });
        });
    });
  });

  describe('DELETE /product/:id', function() {
    it('Creates a new product and deletes it succesfully', function(done) {
      request(app)
        .post('/api/product')
        .send(newProduct)
        .expect(200)
        .then(res => {
          const createdProduct = res.body['product'];
          request(app)
            .delete(`/api/product/${createdProduct._id}`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then(res => {
              expect(res.body).to.have.property('id');
              expect(res.body['id']).to.equal(createdProduct._id);
              done();
            });
        });
    });
  });
});
