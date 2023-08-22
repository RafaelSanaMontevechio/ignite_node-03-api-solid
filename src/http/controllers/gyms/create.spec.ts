import request from 'supertest'; // realiza requisições

import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready(); // app is ready
  });

  afterAll(async () => {
    await app.close(); // app is closed
  });

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .get('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description.',
        phone: '1199999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
