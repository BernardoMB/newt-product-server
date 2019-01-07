import * as request from 'supertest';
import { it, describe } from 'mocha';
import { expect } from 'chai';
import { app } from './../../main';

describe('BALANCE', function() {
  describe('GET /balance', function() {
    it('Returns an array of products as JSON', function(done) {
      request(app)
        .get('/api/balance')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.property('balance');
          const balance = res.body['balance'];
          expect(balance).to.have.property('balance');
          expect(balance).to.have.property('limit');
          expect(balance).to.have.property('date');
          done();
        });
    });
  });
});
