import { join } from "path";
import type { FastifyPluginAsync } from "fastify";
import AutoLoad from "@fastify/autoload";
import type { AutoloadPluginOptions } from "@fastify/autoload";

/**
 * Custom options for the application
 */
export interface AppOptions extends Partial<AutoloadPluginOptions> {
  // Place your custom options types here
}

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts) => {
  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
