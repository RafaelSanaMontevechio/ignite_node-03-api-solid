import request from 'supertest'; // realiza requisições

import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready(); // app is ready
  });

  afterAll(async () => {
    await app.close(); // app is closed
  });

  it('should be able to get profile', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    );
  });
});
