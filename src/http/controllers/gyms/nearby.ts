import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-nearby-gyms-use-case';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuery = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuery.parse(request.query);

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
}
