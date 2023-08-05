import { describe, it, expect, beforeEach } from 'vitest';
import { compare } from 'bcryptjs';

import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError';

let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await registerUseCase.register({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.register({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    });

    const isPasswordCorrectly = await compare('123456', user.password_hash);

    expect(isPasswordCorrectly).toBe(true);
  });

  it('should not be able to register with the same e-mail twice', async () => {
    const email = 'john@example.com';

    await registerUseCase.register({
      name: 'John',
      email,
      password: '123456',
    });

    await expect(() =>
      registerUseCase.register({
        name: 'John',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
