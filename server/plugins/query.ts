import fp from "fastify-plugin";
import { buildQueryService } from "../composition/query.composition.ts"
import { QueryController } from "../presentation/http/controllers/QueryController.ts"

export default fp(async (fastify) => {
    const queryService = await buildQueryService(fastify)
    const queryController = new QueryController(queryService)

    fastify.decorate("queryController", queryController)
})