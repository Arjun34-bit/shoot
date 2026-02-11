import fp from "fastify-plugin";
import { ensureUserIndex } from "../infrastructure/search/create.index.ts"

export default fp(async (fastify) => {
    const elasticPlugin = await ensureUserIndex()

    fastify.decorate("elasticsearch", elasticPlugin)
})