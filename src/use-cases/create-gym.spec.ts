import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

import { CreateGymUseCase } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGymUseCase = new CreateGymUseCase(gymsRepository);
  });

  it('should to create gym', async () => {
    const { gym } = await createGymUseCase.createGym({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitute: -27.2092052,
      longitute: -49.6401091,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
