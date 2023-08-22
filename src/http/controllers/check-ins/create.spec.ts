import { Gym } from '@prisma/client';
import request from 'supertest'; // realiza requisições

import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';
import { prisma } from '@/lib/prisma';

describe('Create CheckIn (e2e)', () => {
  beforeAll(async () => {
    await app.ready(); // app is ready
  });

  afterAll(async () => {
    await app.close(); // app is closed
  });

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
