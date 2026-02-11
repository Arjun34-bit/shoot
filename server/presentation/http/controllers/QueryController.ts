import type { FastifyReply, FastifyRequest } from "fastify"
import type { QueryServices } from "../../QueryInterface.ts";
import type { QueryInput } from "../../../types/QueryTypes.ts";

export class QueryController {
    private queryService: QueryServices
    constructor(queryService: QueryServices){
        this.queryService = queryService
    }

    async searchUser(req: FastifyRequest<{Body:QueryInput}>, reply: FastifyReply){
        try {
            const result = await this.queryService.searchByName(req.body)
            reply.code(201).send({ success: true, data: result });
        } catch (error: any) {
            reply.code(400).send({ message: error.message });
        }
    }
}