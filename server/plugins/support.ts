import fp from 'fastify-plugin';

export interface SupportPluginOptions {
  // Specify any options this plugin might take here
}

// 1. Module Augmentation: Tells TypeScript about the new decorator
declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
  }
}

// 2. The Plugin Logic
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.decorate('someSupport', function () {
    return 'hugs';
  });
});