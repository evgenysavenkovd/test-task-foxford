import { JwtPayload } from '../types/jwt-payload.interface.ts';

declare module 'fastify' {
  interface FastifyRequest {
    user: JwtPayload;
  }
}
