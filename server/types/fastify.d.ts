import "fastify";
import { Queue, Worker } from "bullmq";
import type Redis from "ioredis";
import type { AuthController } from "../presentation/http/controllers/AuthController";
import type { JWTTokenService } from "../infrastructure/security/JwtAuth";
import type { QueryController } from "../presentation/http/controllers/QueryController";

declare module "fastify" {
  interface FastifyInstance {
    redis: Redis;
    authController: AuthController;
    queryController: QueryController;
    jwt: {
      sign(payload: object): string;
      verify<T>(token: string): T;
    };
  }
  interface FastifyRequest {
    user?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      role: number;
      org_id: string;
      schema_name?: string;
      iat?: number;
      exp?: number;
    };
    orgId: string;
    schema: string;
  }
}
