import type { QueryInput, QueryOutput } from "../types/QueryTypes.ts";

export interface QueryServices {

// An interface is a pure abstraction
// It defines what must be done and hides how it is done
// It contains no implementation

    searchByName(data: QueryInput): Promise<QueryOutput[]>
}