import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import type { RedisClientType } from "redis";
import { createRedisClient } from "../infrastructure/redis/redis.ts";

declare module "fastify" {
  interface FastifyInstance {
    redis: RedisClientType;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const redis = await createRedisClient();

  fastify.decorate("redis", redis);

  fastify.addHook("onClose", async () => {
    await redis.quit();
  });
});
