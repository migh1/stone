import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import app from '../../src/config/express';
import db from '../../src/config/database';
import { crypto, jwt } from '../../src/utils';

const encryptedPassword = crypto.encrypt('123456');
const originEmail = 'teste1@email.com';

const originAccount = {
  name: 'Teste Nome 1',
  email: originEmail,
  password: encryptedPassword,
  amount: 167.32,
  created_at: Date.now(),
};

describe('Withdraw', () => {
  it('should not be able to withdraw when account not exists', async (done) => {
    const originToken = jwt.sign(originEmail);

    const response = await request(app)
      .post('/api/1/withdraw')
      .set({ Authorization: `Bearer ${originToken}` })
      .send({ amount: 112.54 });

    expect(response.status).toBe(404);
    expect(response.text).toBe(`Account for email: ${originEmail} not found`);

    done();
  });

  it("should be able to withdraw when account's amount is greather than requested", async (done) => {
    await db.getCollection('accounts').insert(originAccount);

    const originToken = jwt.sign(originEmail);

    const response = await request(app)
      .post('/api/1/withdraw')
      .set({ Authorization: `Bearer ${originToken}` })
      .send({ amount: 112.54 });

    expect(response.status).toBe(200);

    done();
  });

  it("should not be able to withdraw when account's amount is less than requested", async (done) => {
    const originToken = jwt.sign(originEmail);

    const response = await request(app)
      .post('/api/1/withdraw')
      .set({ Authorization: `Bearer ${originToken}` })
      .send({ amount: 98.81 });

    expect(response.status).toBe(412);
    expect(response.text).toBe('Insufficient amount to proceed');

    done();
  });
});
