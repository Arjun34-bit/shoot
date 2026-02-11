import type { QueryOutput } from "../../types/QueryTypes.ts";

export interface UserSearchRepository {
    searchByName(query: string) : Promise<QueryOutput[]>
    indexUser(user: {
        id: string;
        email: string;
    }): Promise<void>
}