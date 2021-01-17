import request from 'supertest';
import app from '../../src/config/express';
import db from '../../src/config/database';
import { crypto, jwt } from '../../src/utils';

describe('Transfers', () => {
  it("should not transfer when account's amount is less then requested amount ", async (done) => {
    const encryptedPassword = crypto.encrypt('123456');

    const originAccount = {
      name: 'Teste Nome 1',
      email: 'teste1@email.com',
      password: encryptedPassword,
      amount: 100,
      created_at: Date.now(),
    };
    const targetAccount = {
      name: 'Teste Nome 2',
      email: 'teste2@email.com',
      password: encryptedPassword,
      amount: 400,
      created_at: Date.now(),
    };

    await db.getCollection('accounts').insert(originAccount);
    await db.getCollection('accounts').insert(targetAccount);

    const originToken = jwt.sign(originAccount.email);

    const createTransferPayload = {
      target_email: targetAccount.email,
      amount: 350,
    };

    const response = await request(app)
      .post('/api/1/transfer')
      .set({ Authorization: `Bearer ${originToken}` })
      .send(createTransferPayload);

    expect(response.status).toBe(412);
    expect(response.text).toBe('Insufficient amount to proceed');

    done();
  });
});
