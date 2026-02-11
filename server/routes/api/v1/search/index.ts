// import type { FastifyPluginAsync } from "fastify";
// import { esClient } from "../../../../infrastructure/search/ElasticSearchClient.ts";

// const searchRoutes: FastifyPluginAsync = async(fastify) => {
//     const queryController = fastify.queryController

//     fastify.get("/health", async(req, reply) => {
//         const health = await esClient.cluster.health()
//         reply.send(health)
//     });

//     fastify.post("/", queryController.searchUser.bind(queryController));
// }

// export default searchRoutes
