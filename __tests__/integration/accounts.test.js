import request from 'supertest';
import app from '../../src/config/express';
import { crypto } from '../../src/utils';

describe('Accounts', () => {
  it('should create an account', async (done) => {
    const createPayload = {
      name: 'Teste Nome 1',
      email: 'teste1@email.com',
      password: '123456',
    };

    const encryptedPassword = crypto.encrypt(createPayload.password);

    const response = await request(app).post('/api/1/account').send(createPayload);
    expect(response.status).toBe(201);

    const parseResponse = JSON.parse(response.text);

    expect(parseResponse.name).toBe(createPayload.name);
    expect(parseResponse.password).toBe(encryptedPassword);
    expect(parseResponse.email).toBe(createPayload.email);
    expect(parseResponse.created_at).not.toBeNull();

    done();
  });

  it('should not create an account with existing email', async (done) => {
    const createPayload = {
      name: 'Teste Nome 1',
      email: 'teste1@email.com',
      password: '123456',
    };

    const response = await request(app).post('/api/1/account').send(createPayload);

    expect(response.status).toBe(409);
    expect(response.text).toBe('This account already exists');

    done();
  });
});
