import { FastifyRequest, FastifyReply } from 'fastify';

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify(); //checks if the token is valid
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized.' });
  }
}
