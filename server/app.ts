"use strict";

import { join } from "node:path";
import type { FastifyPluginAsync } from "fastify";
import AutoLoad from "@fastify/autoload";
import type { AutoloadPluginOptions } from "@fastify/autoload";

import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Custom options for the application
 */
export interface AppOptions extends Partial<AutoloadPluginOptions> {
  // Place your custom options types here
}

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  // Place here your custom code!

  // This loads all plugins defined in plugins
  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    forceTypeScript: true,
    extensions: ["js", "ts"],
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};

export default app;
export { app, options };
