import { accountsService } from '../../src/services';
import { accountsRepository } from '../../src/repositories';
import { crypto } from '../../src/utils';

jest.mock('../../src/repositories');

const encryptedPassword = crypto.encrypt('123456');

describe('Accounts Service', () => {
  it('should not find account', async (done) => {
    const mockedResponse = null;
    accountsRepository.find.mockResolvedValue(mockedResponse);

    const payload = {
      email: 'teste1@email.com',
      password: '12345',
    };

    const response = await accountsService.find(payload);

    expect(response.status).toBe(404);
    expect(response.body).toBe('Account not found for email teste1@email.com');

    done();
  });

  it('should find account but with wrong password', async (done) => {
    const mockedResponse = {
      email: 'teste1@email.com',
      password: encryptedPassword,
      name: 'Teste usuario 1',
      amount: 300.22,
      created_at: Date.now(),
    };
    accountsRepository.find.mockResolvedValue(mockedResponse);

    const payload = {
      email: 'teste1@email.com',
      password: '12345',
    };

    const response = await accountsService.find(payload);

    expect(response.status).toBe(401);
    expect(response.body).toBe('Invalid Password');

    done();
  });

  it('should find account successfully', async (done) => {
    const mockedResponse = {
      email: 'teste1@email.com',
      password: encryptedPassword,
      name: 'Teste usuario 1',
      amount: 300.22,
      created_at: Date.now(),
    };
    accountsRepository.find.mockResolvedValue(mockedResponse);

    const payload = {
      email: 'teste1@email.com',
      password: '123456',
    };

    const response = await accountsService.find(payload);

    expect(response.status).toBe(200);
    expect(response.body.amount).toBe(mockedResponse.amount);
    expect(response.body.email).toBe(mockedResponse.email);
    expect(response.body.password).toBe(mockedResponse.password);
    expect(response.body.name).toBe(mockedResponse.name);

    done();
  });
});
