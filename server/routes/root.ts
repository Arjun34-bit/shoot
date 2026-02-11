import type { FastifyPluginAsync } from 'fastify';

/**
 * Root route handler
 */
const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (request, reply) => {
    return { root: true };
  });
};

export default root;