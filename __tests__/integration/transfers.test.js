import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import app from '../../src/config/express';
import db from '../../src/config/database';
import { crypto, jwt } from '../../src/utils';

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
const thirdAccount = {
  name: 'Teste Nome 3',
  email: 'teste3@email.com',
  password: encryptedPassword,
  amount: 700.65,
  created_at: Date.now(),
};

const originEmail = 'teste1@email.com';

const firstTransfer = {
  id: uuidv4(),
  origin_email: originEmail,
  target_email: 'teste2@email.com',
  amount: 150,
  created_at: Date.now(),
};
const secondTransfer = {
  id: uuidv4(),
  origin_email: originEmail,
  target_email: 'teste3@email.com',
  amount: 300,
  created_at: Date.now(),
};
const thirdTransfer = {
  id: uuidv4(),
  origin_email: 'teste2@email.com',
  target_email: originEmail,
  amount: 678.98,
  created_at: Date.now(),
};

describe('Transfers', () => {
  // TODO: beforEach reseting database data

  it('should not list account transfers for an invalid account', async (done) => {
    await db.getCollection('transfers').insert(firstTransfer);
    await db.getCollection('transfers').insert(secondTransfer);
    await db.getCollection('transfers').insert(thirdTransfer);

    const originToken = jwt.sign(originEmail);

    const response = await request(app)
      .get('/api/1/transfer')
      .set({ Authorization: `Bearer ${originToken}` });

    expect(response.status).toBe(404);
    expect(response.text).toBe(`Account for email: ${originEmail} not found`);

    done();
  });

  it('should list all the account transfers (received/sent)', async (done) => {
    await db.getCollection('accounts').insert(originAccount);
    await db.getCollection('accounts').insert(targetAccount);
    await db.getCollection('accounts').insert(thirdAccount);

    const originToken = jwt.sign(originEmail);

    const response = await request(app)
      .get('/api/1/transfer')
      .set({ Authorization: `Bearer ${originToken}` });

    expect(response.status).toBe(200);

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse).toHaveLength(3);
    expect(parsedResponse[0].amount).toBe(150);
    expect(parsedResponse[1].amount).toBe(300);
    expect(parsedResponse[2].amount).toBe(678.98);

    done();
  });

  it("should not transfer when account's amount is less then requested amount ", async (done) => {
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
