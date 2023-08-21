import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuery = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1), // convert to number
  });

  const { q, page } = searchGymsQuery.parse(request.params);

  const SearchGymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await SearchGymsUseCase.execute({
    query: q,
    page,
  });

  return reply.status(201).send({ gyms });
}
