import request from 'supertest';
import app from '../../src/config/express';
import db from '../../src/config/database';
import { crypto } from '../../src/utils';

describe('Authentication', () => {
  it('should not found account', async (done) => {
    const response = await request(app).post('/api/1/signin').send({
      email: 'teste1@email.com',
      password: '123456',
    });

    expect(response.status).toBe(404);
    expect(response.text).toBe('Account not found for email teste1@email.com');

    done();
  });

  it('should not authenticate with invalid credentials', async (done) => {
    const encryptedPassword = crypto.encrypt('123456');

    await db.getCollection('accounts').insert({
      name: 'Teste Nome',
      email: 'teste1@email.com',
      password: encryptedPassword,
      amount: 1000,
      created_at: Date.now(),
    });

    const response = await request(app).post('/api/1/signin').send({
      email: 'teste1@email.com',
      password: '12345',
    });

    expect(response.status).toBe(401);
    expect(response.text).toBe('Invalid Password');

    done();
  });

  it('should authenticate with valid credentials', async (done) => {
    const encryptedPassword = crypto.encrypt('123456');

    await db.getCollection('accounts').insert({
      name: 'Teste Nome',
      email: 'teste1@email.com',
      password: encryptedPassword,
      amount: 1000,
      created_at: Date.now(),
    });

    const response = await request(app).post('/api/1/signin').send({
      email: 'teste1@email.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.text).not.toBeNull();

    done();
  });
});
