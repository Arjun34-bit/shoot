import type { QueryInput, QueryOutput } from "../../../types/QueryTypes.ts";
import type { UserSearchRepository } from "../../../domain/interface/UserSearchRepositories.ts";

export class SearchUser {
    private searchRepo: UserSearchRepository

    constructor(searchRepo: UserSearchRepository){
        this.searchRepo = searchRepo
    }

    async execute(input: QueryInput): Promise<QueryOutput[]> {
        if (!input.query || input.query.length < 2) {
            throw new Error("less keyword to search")
        }

        const users = await this.searchRepo.searchByName(
            input.query,
        );

        if(users.length === 0){
            throw new Error("No Results")
        }

        return users.map((user: QueryOutput) => ({
            id: user.id,
            name: user.name,
            email: user.email
        }));
    }
}