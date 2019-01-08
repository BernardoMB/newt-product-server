import * as request from 'supertest';
import { it, describe } from 'mocha';
import { expect } from 'chai';

import { app } from './../../main';

import { IBalance } from '../../models/interfaces/IBalance';

describe('BALANCE', function() {
  describe('GET /balance', function() {
    it('Returns the current balance for the channel', async function() {
      try {
        const currentDate = new Date();
        const res = await request(app)
          .get('/api/balance')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
        expect(res.body).to.have.property('balance');
        const balance: IBalance = res.body['balance'];
        expect(balance).to.have.property('balance');
        expect(balance.balance, 'Should be greater than zero').to.be.greaterThan(0);
        expect(balance).to.have.property('limit');
        expect(balance.limit, 'Should be greater than zero').to.be.greaterThan(0);
        expect(balance).to.have.property('date');
        expect(new Date(balance.date), 'Should return the current date').to.be.greaterThan(currentDate);
      } catch (e) {
        console.error('\t', e.message);
        throw e;
      }
    });
  });
});
